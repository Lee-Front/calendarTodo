import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";

const useAxios = (method: HttpMethod, url: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios[method](url);
      setData(response.data);
    };
    fetchData();
  }, [url]);

  return data;
};

export default useAxios;
