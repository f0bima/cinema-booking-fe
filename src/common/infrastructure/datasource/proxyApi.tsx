import axios from "axios";

const baseUrl = "http://localhost:4321/api";

export type TErrorData = {
  code: string;
  message: string;
  errors: { field: string; message: string }[];
};

export type TApiError = Error & {
  data?: TErrorData;
};

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
    console.log("Response received:", response.data);
    return response.data;
  },
  (error) => {
    let errorData;

    if (error.response) {
      console.error("Error response:", error.response.data.error);
      errorData = error?.response?.data?.error;
    } else if (error.request) {
      console.error("No response received:", error.request);
      errorData = error?.request;
    } else {
      console.error("Axios error:", error.message);
      errorData = error?.message;
    }

    return Promise.reject({
      ...error,
      data: errorData,
    } as TApiError);
  },
);
