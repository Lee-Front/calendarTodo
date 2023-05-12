import React from "react";
import axios from "axios";
import { AxiosInstance } from "axios";
import { response } from "msw";

const useAxios = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = document.cookie;
      console.log("111");
      if (token) {
        try {
          //const response = await axiosInstance.post("/refreshToken", { token });
          console.log("1");
          //   if (response.status === 200) {
          //     console.log("refresh token");
          //   }
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
      console.log("eee");
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = document.cookie;
        await axiosInstance.post("/refreshToken", { refreshToken });
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
