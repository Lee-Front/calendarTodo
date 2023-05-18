import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use(
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
    console.log("e1 : ", error.response.status);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("e2 : ", error.response.status);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await axios.post("/refreshToken", { refreshToken });
        return axios(originalRequest);
      }
    } else if (error.response.status === 301) {
      console.log("err : ", error);
    }
    return Promise.reject(error);
  }
);