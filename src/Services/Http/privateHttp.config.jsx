import axios from "axios";
import { baseUrl } from "./baseUrl.jsx";
import { toast } from "react-toastify";
import token from "../../Utils/token.js";

const handleLogout = () => {
    localStorage.removeItem("data");
    localStorage.removeItem("id");
    localStorage.removeItem("accessToken");
    window.location.href = '/login';
};

const privateHttp = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

privateHttp.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

privateHttp.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      token.removeAccessToken();
      toast.success("Need to login");
      window.location.href = "/login";
      return Promise.reject(error);
    }
      if (error.response && error.response.status === 403) {
          // Handle logout
          handleLogout()
      }
    return Promise.reject(error);
  },
);

export default privateHttp;

