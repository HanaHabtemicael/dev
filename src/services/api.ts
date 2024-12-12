// services/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";
import { BASE_URL } from "@/config/index";

const api = axios.create({
  baseURL: `${BASE_URL}`,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers["Accept"] = "application/json";
      config.headers.Authorization = `Bearer ${session.user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;
