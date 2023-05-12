import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AxiosInstance, AxiosResponse, AxiosError } from "axios";

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
interface SystemError {
  code: string;
  message: string;
}
const useAxios = ({ method, url, body, headers }: UseAxiosOptions) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<SystemError | null>(null);

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: url,
    headers,
    data: body,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axiosInstance[method](url);
        setData(response.data);
      } catch (e) {
        setError(e);
      }
    };
    fetchData();
  }, [url]);

  return data;
};

export default useAxios;
