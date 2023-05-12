import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

type HttpMethod = "get" | "post" | "put" | "delete";

interface AxiosResponseWithToken {
  data: {
    token: string;
  };
}

interface UseAxiosOptions {
  method: HttpMethod;
  url: string;
  body?: any;
  headers?: any;
}

const useAxios = ({ method, url, body, headers }: UseAxiosOptions) => {
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
