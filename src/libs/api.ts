import { create } from "axios";

export const api = create({
  baseURL: process.env.API_BASE_URL || "http://192.168.100.4:8000/api/v1",
});
