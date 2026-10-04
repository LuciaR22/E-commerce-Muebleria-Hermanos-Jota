import { useEffect, useMemo, useRef, useState } from "react";
import { normalizeErrorMessage } from "../services/api";

const initialState = {
    status: "idle",
    data: null,
    error: null,
    errorMeta: null,
};

function useApiResource(loader, dependencies = []) {
    const loaderRef = useRef(loader);
    const [retryToken, setRetryToken] = useState(0);
    const [state, setState] = useState(initialState);

    useEffect(() => {
        loaderRef.current = loader;
    }, [loader]);

    const retry = () => {
        setRetryToken(currentValue => currentValue + 1);
    };

    useEffect(() => {
        let isMounted = true;

        const cargar = async () => {
            setState(previousState => ({
                ...previousState,
                status: previousState.data ? "refreshing" : "loading",
                error: null,
                errorMeta: null,
            }));

            try {
                const data = await loaderRef.current();

                if (!isMounted) {
                    return;
                }

                setState({
                    status: "success",
                    data,
                    error: null,
                    errorMeta: null,
                });
            } catch (error) {
                if (!isMounted) {
                    return;
                }

                const normalizedError = normalizeErrorMessage(error);

                setState({
                    status: "error",
                    data: null,
                    error: normalizedError.userMessage,
                    errorMeta: normalizedError,
                });
            }
        };

        cargar();

        return () => {
            isMounted = false;
        };
    }, [retryToken, ...dependencies]);

    return useMemo(
        () => ({
            ...state,
            isLoading: state.status === "loading" || state.status === "refreshing",
            isRefreshing: state.status === "refreshing",
            retry,
        }),
        [retry, state],
    );
}

export default useApiResource;
