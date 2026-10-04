const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const DEFAULT_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};

async function request(endpoint, options = {}, retries = 2) {
    const url = /^https?:\/\//i.test(endpoint)
        ? endpoint
        : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    let lastError;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    ...DEFAULT_HEADERS,
                    ...(options.headers || {}),
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Request failed with status ${response.status}`);
            }

            const contentType = response.headers.get("content-type") || "";

            if (contentType.includes("application/json")) {
                return await response.json();
            }

            return response;
        } catch (error) {
            lastError = error;

            if (attempt === retries) {
                throw error;
            }

            await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
        }
    }

    throw lastError;
}

export { API_BASE_URL, request };
