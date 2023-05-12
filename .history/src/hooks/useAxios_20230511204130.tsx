import React from "react";
import axios from "axios";
import { AxiosInstance } from "axios";
import { response } from "msw";

const useAxios = () => {
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000",
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = document.cookie;
      console.log("token: ", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //axiosInstance.interceptors.response에서 리프레쉬 api를 호출하는 로직
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("1");
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      console.log("2");
      if (error.response.status === 401 && !originalRequest._retry) {
        console.log("3");
        originalRequest._retry = true;
        const refreshToken = document.cookie;
        const response = await axiosInstance.post("/refreshToken", { refreshToken });
        if (response.status === 200) {
          console.log("토큰 재발급 성공");
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
