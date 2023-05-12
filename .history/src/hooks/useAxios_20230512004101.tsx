import React from "react";
import axios from "axios";
import { AxiosInstance } from "axios";

const useAxios = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = document.cookie;
      if (token) {
        try {
          config.headers.Authorization = `Bearer ${token}`;
        } catch (e) {}
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = document.cookie;
        console.log("refreshToken: ", refreshToken);
        const response = await axiosInstance.post("/token", { refreshToken });
        if (response.status === 200) {
          const accessToken = response.data.accessToken;
          document.cookie = accessToken;
          axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
