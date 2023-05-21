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
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log("err : ", error);
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        await axios.post("/refreshToken", { refreshToken });
        return axios(originalRequest);
      }
    }

    //window.location.href = "/login";
    return Promise.reject(error);
  }
);
