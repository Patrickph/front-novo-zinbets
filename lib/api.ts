"use client";
import axios, { AxiosError } from "axios";

interface FetchWrapperAPIProps {
  baseURL?: string;
  ctx?: any;
}
function FetchWrapperAPI({
  ctx = undefined,
  baseURL = process.env.NEXT_PUBLIC_API_URL,
}: FetchWrapperAPIProps) {
  let tokenStorage = "";

  if (typeof window !== "undefined") {
    const item = window.localStorage.getItem("bet.token");

    tokenStorage = item ? JSON.parse(item) : null;
  }

  const bearer = tokenStorage ?? "";

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError) => {
      if (!!tokenStorage && error.response?.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("bet.token");
        }

        delete api.defaults.headers["Authorization"];

        window.location.href = "/";
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export const api = FetchWrapperAPI({});
