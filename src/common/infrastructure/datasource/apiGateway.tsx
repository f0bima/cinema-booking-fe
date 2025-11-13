import type { TApiError } from "@/common/domain/apiError.entity";
import axios from "axios";

const baseUrl = import.meta.env.PUBLIC_BE_BASE_URL;

export const API_GATEWAY = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 5000,
});

API_GATEWAY.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

API_GATEWAY.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.data);
    return response;
  },
  (error) => {
    let message;
    const statusCode = error?.response?.status ?? 500;

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
