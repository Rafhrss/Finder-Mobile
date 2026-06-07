import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL || "http://192.168.100.4:8000/api/v1",
});
