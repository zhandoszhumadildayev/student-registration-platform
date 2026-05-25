import { useEffect, useState } from "react";

function useFetch(fetcher, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setLoading(true);
      setError("");

      try {
        const result = await fetcher(controller.signal);
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch data.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();

    return () => {
      controller.abort();
    };
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, setData };
}

export default useFetch;
