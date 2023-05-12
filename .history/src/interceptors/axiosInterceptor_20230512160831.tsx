import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

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
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await axiosInstance.post("/refreshToken", { refreshToken });
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
