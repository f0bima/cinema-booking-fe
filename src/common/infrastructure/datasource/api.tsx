import axios from "axios";

const baseUrl = import.meta.env.PUBLIC_BE_BASE_URL;

export type TErrorData = {
  code: string;
  message: string;
  errors: { field: string; message: string }[];
};

export type TApiError = Error & {
  data?: TErrorData;
};

export const API = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 5000,
});

API.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.data);
    return response;
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
