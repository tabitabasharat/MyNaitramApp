// axios.js (interceptor setup)
import axios from "axios";

const api = axios.create();

if (typeof window !== "undefined") {
  api.interceptors.request.use(
    (config) => {
      const token = typeof window !== "undefined" ?  localStorage.getItem("token") : null;

      if (token) {
        config.headers.Authorization = `${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(                 
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        typeof window !== "undefined" ? window.location.href = "/login":null;
      }
      return Promise.reject(error);
    }
  );
}

export default api;
