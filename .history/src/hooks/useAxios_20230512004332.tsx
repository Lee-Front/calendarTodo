import React from "react";
import axios from "axios";
import { AxiosInstance } from "axios";
import Cookies from "js-cookie";

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
      const accessToken = Cookies.get("accessToken");
      const refreshToken = Cookies.get("refreshToken");
      console.log("accessToken : ", accessToken);
      console.log("refreshToken : ", refreshToken);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const cookies = document.cookie;

        if (cookies) {
          const accessToken = Cookies.get("accessToken");
          const refreshToken = Cookies.get("refreshToken");
          console.log("accessToken : ", accessToken);
          console.log("refreshToken : ", refreshToken);
          await axiosInstance.post("/refreshToken", { refreshToken });
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
