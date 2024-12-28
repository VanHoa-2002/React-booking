import { useEffect, useState, useCallback } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage
            .getItem("token")
            ?.replace(/"/g, "")}`,
        },
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }
      setData(result.data);
      setPagination(result.pagination);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return data, loading, error, and refetch function
  return {
    data,
    loading,
    error,
    pagination,
    refetch: fetchData,
  };
};

export default useFetchData;
