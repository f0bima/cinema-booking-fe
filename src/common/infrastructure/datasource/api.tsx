import axios from "axios";

const baseUrl = "http://localhost:3000/api/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3NjMwMTYwMDAsInJvbGUiOiJjdXN0b21lciIsInVzZXJJZCI6MX0.taIIj-MgaaIKKqjwJbt2X5_YLbo8-cd93k2rLhQ7zQg";
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
    config.headers.Authorization = `Bearer ${token}`;
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
