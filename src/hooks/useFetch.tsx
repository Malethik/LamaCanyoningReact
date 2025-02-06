import { useState, useEffect, useCallback } from "react";

const useFetch = <T,>(endpoint: string) => {
  /*   const baseUrl = "https://lamaback-owg8.onrender.com"; */
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(baseUrl);

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      if (!baseUrl) {
        throw new Error("Backend URL not set");
      }
      const response = await fetch(`${baseUrl}/${endpoint}`);
      if (!response.ok) {
        throw new Error(`Errore: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch {
      setError("Errore nel caricamento dei dati");
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};

export default useFetch;
