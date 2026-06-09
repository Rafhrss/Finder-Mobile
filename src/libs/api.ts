import { create } from "axios";

export const api = create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || "http://10.23.0.245:8000/api/v1",
});
