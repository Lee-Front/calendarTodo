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
      console.log("token: ", token);
      if (token) {
        //config.headers.Authorization = `Bearer ${token}`;
        const refreshToken = document.cookie;
        await axiosInstance.post("/refreshToken", { refreshToken });
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
