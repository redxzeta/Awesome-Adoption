import { useState } from "react";

const useSupa = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSupa = async (supaFun) => {
    setLoading(true);
    try {
      const response = await supaFun();
      const { error } = response;
      if (error) throw error;
      setData(response);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchSupa };
};

export default useSupa;
