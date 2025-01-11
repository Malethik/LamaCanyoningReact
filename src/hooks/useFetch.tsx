import { useState, useEffect } from "react";

const useFetch = <T,>(endpoint: string) => {
  const baseUrl = "https://lamaback-owg8.onrender.com";
  console.log(baseUrl);

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fecthData = async () => {
      try {
        if (!baseUrl) {
          throw new Error("Backend URL not set");
        }
        const response = await fetch(`${baseUrl}/${endpoint}`);
        if (!response.ok) {
          throw new Error(
            `Errore: ${response.status} - ${response.statusText}`
          );
        }
        const result = await response.json();
        setData(result);
      } catch {
        setError("Errore nel caricamento dei dati");
      } finally {
        setLoading(false);
      }
    };
    fecthData();
  }, [endpoint, baseUrl]);

  return { data, error, loading };
};

export default useFetch;
