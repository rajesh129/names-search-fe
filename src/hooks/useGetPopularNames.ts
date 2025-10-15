import { useState, useEffect } from "react";
import { getPopularNames } from "../services/popular";

export const useGetPopularNames = () => {
    const [data, setData] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null);

    const fetchPopularNames = async () => {
        setLoading(true);
        try {
            const names = await getPopularNames();
            setData(names);
        } catch (e: any) {
            if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return
            const msg = e?.message?.includes('Network Error')
            ? 'Network error. In dev, enable Vite proxy or API CORS.'
            : e?.message || 'Failed to fetch results';
            setError(msg);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPopularNames();
    }, [])

    return { data, loading, error }
}