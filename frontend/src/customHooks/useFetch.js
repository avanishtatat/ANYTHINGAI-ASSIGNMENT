import { useState, useEffect } from 'react';

const useFetch = (apiFunc) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc();
      setData(response);
      setError(null)
    } catch (error) {
      setError(error?.message ? error.message : "Internal server error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  return { loading, error, data }
}

export default useFetch;