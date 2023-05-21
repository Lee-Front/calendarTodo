import axios from "axios";
import Cookies from "js-cookie";

axios.interceptors.request.use(
  async (config) => {
    const token = document.cookie;
    if (token && config.url !== "/validateToken" && config.url !== "/refreshToken") {
      try {
        const isValidToken = await axios.get("/validateToken");

        if (isValidToken) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        } else {
          console.log("asdf");
          console.log("isValidToken: ", isValidToken);
          new Error(isValidToken);
        }
      } catch (e) {
        console.log("e : ", e);
      }
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
    if (error.response.status === 401 && !originalRequest._retry) {
      console.log("1");
      originalRequest._retry = true;
      const refreshToken = Cookies.get("refreshToken");
      if (refreshToken) {
        console.log("2");
        await axios.post("/refreshToken", { refreshToken });
        return axios(originalRequest);
      }
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
