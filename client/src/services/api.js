const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_RETRIES = 2;

const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

function buildRequestError(message, status = 0, details = null, retryable = false) {
    const error = new Error(message);
    error.status = status;
    error.details = details;
    error.userMessage = message;
    error.retryable = retryable;
    return error;
}

function isRetryableStatus(status) {
    return status === 0 || status === 408 || [429, 500, 502, 503, 504].includes(status);
}

function normalizeErrorMessage(error) {
    if (error?.name === "AbortError") {
        return {
            title: "La solicitud tardó demasiado",
            userMessage: "La API no respondió dentro del tiempo esperado. Reintentá nuevamente.",
            status: 408,
            retryable: true,
        };
    }

    if (error?.status === 404) {
        return {
            title: "Producto no encontrado",
            userMessage: "No encontramos este producto. Puede que haya sido removido o que la URL sea incorrecta.",
            status: 404,
            retryable: false,
        };
    }

    if ([500, 502, 503, 504].includes(error?.status)) {
        return {
            title: "Problema temporal del servidor",
            userMessage: "El servidor está teniendo problemas en este momento. Intenta de nuevo en unos segundos.",
            status: error.status,
            retryable: true,
        };
    }

    if (error?.message) {
        return {
            title: "No pudimos completar la solicitud",
            userMessage: error.message,
            status: error.status || 0,
            retryable: error?.retryable ?? isRetryableStatus(error?.status || 0),
        };
    }

    return {
        title: "No pudimos completar la solicitud",
        userMessage: "No se pudo completar la solicitud. Revisá tu conexión e intentá nuevamente.",
        status: 0,
        retryable: true,
    };
}

async function request(endpoint, options = {}, retries = DEFAULT_RETRIES, timeoutMs = DEFAULT_TIMEOUT_MS) {
    const url = /^https?:\/\//i.test(endpoint)
        ? endpoint
        : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    let lastError;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    ...DEFAULT_HEADERS,
                    ...(options.headers || {}),
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                let parsedError = {};

                try {
                    parsedError = errorText ? JSON.parse(errorText) : {};
                } catch {
                    parsedError = {};
                }

                const detail = parsedError.message || parsedError.error || errorText || "La solicitud falló.";
                throw buildRequestError(detail, response.status, parsedError, isRetryableStatus(response.status));
            }

            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                return await response.json();
            }

            return response;
        } catch (error) {
            lastError = error;

            if (error?.name === "AbortError") {
                lastError = buildRequestError(
                    "La API no respondió dentro del tiempo esperado. Intenta nuevamente.",
                    408,
                    {
                        timeout: true,
                    },
                    true,
                );
            }

            if (attempt < retries) {
                const retryDelay = 250 * (attempt + 1);
                await new Promise(resolve => setTimeout(resolve, retryDelay));
                continue;
            }

            throw lastError;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    throw lastError;
}

export { API_BASE_URL, normalizeErrorMessage, request };
