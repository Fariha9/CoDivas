import axios from "axios";

const API = axios.create({
  baseURL: "https://codivas.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const askAssistant = async (message) => {
  const response = await API.post("/assistant", {
    message,
  });

  return response.data;
};