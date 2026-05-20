import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
});

// session timeout — 15 minutes
let sessionTimer;

const resetTimer = () => {
  clearTimeout(sessionTimer);
  sessionTimer = setTimeout(
    () => {
      localStorage.clear();
      window.location.href = "/login";
      alert("Session expired. Please login again.");
    },
    15 * 60 * 1000,
  );
};

["click", "keypress", "scroll", "mousemove"].forEach((event) => {
  window.addEventListener(event, resetTimer);
});

resetTimer();

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default API;
