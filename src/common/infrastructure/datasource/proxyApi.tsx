import type { TApiError } from "@/common/domain/apiError.entity";
import axios from "axios";

const baseUrl = "/api";

export const PROXY_API = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 5000,
});

PROXY_API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

PROXY_API.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    let message;
    const statusCode = error?.response?.status ?? 500;

    console.log(error.response.status);
    if (error.response) {
      message = error?.response?.data?.error;
    } else if (error.request) {
      message = error?.request;
    } else {
      message = error?.message;
    }

    return Promise.reject({
      ...error,
      data: { message, code: statusCode },
    } as TApiError);
  },
);
