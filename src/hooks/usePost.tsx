import { useState } from "react";

const usePost = <T,>() => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  const postData = async (endpoint: string, payload: unknown) => {
    setLoading(true);
    setError(null);

    try {
      if (!baseUrl) {
        throw new Error("URL del backend non configurato");
      }

      const response = await fetch(`${baseUrl}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Errore: ${response.status} - ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
      return result;
    } catch {
      setError("Errore nel caricamento dei dati");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, postData };
};

export default usePost;
