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

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = headers.cookies.get("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axiosInstance[method](url);
        setData(response.data);
      } catch (e: unknown) {
        const error = e as SystemError;
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return data;
};

export default useAxios;
