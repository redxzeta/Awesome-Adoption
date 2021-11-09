import { useEffect, useState } from "react";

const useFetch = (method = "GET", url, body = null, dep = []) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const fetchFunction = async () => {
      setIsLoading(true);
      setServerError(false);
      const config = { method: method, body: body };

      try {
        const response = await fetch(url, config);
        const { status, error } = response;
        if (status === 404 || error) throw response;
        const json = await response.json();

        setData(json);
      } catch (error) {
        setData(null);
        setServerError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFunction();
  }, dep);

  return { data, isLoading, serverError };
};

export default useFetch;
