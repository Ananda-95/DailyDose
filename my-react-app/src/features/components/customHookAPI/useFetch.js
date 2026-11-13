
import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (signal) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(url, { signal });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const result = await response.json();

            setData(result);

        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [url]);

    useEffect(() => {
        const controller = new AbortController();

        fetchData(controller.signal);

        return () => {
            controller.abort();
        };
    }, [fetchData]);

    const refetch = () => {
        const controller = new AbortController();
        fetchData(controller.signal);
    };

    return {
        data,
        loading,
        error,
        refetch
    };
};

export default useFetch;
