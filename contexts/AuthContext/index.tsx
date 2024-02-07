"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextProviderProps, User, SignUpFormData } from "./types";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { api } from "@/lib/api";
import { useLocalStorage } from "@/utils/useLocalStorage";

interface AuthContextType {
  user: User | null;
  isLogged: boolean;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (
    token: string,
    password: string,
    password_confirmation: string
  ) => Promise<any>;
  signUp(data: SignUpFormData): Promise<any>;
  signIn(email: string | string[], password: string): Promise<any>;
  signOut: () => void;
  fetchMe: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  ref: string | null;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useLocalStorage<string | null>("bet.token", null);
  const [user, setUser] = useLocalStorage<User | null>("bet.user", null);
  const [ref, setRef] = useLocalStorage<string | null>("bet.ref", null);
  const search = useSearchParams();

  const refUrl = search.get("ref");

  const cookies = parseCookies();
  const router = useRouter();

  const resetPassword = async (
    token: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      const response = await api.post("/reset-password", {
        token,
        password,
        password_confirmation,
      });

      return {
        type: "success",
        message: response.data.message,
      };
    } catch (error: any) {
      return {
        type: "error",
        message: error?.response?.data?.message,
      };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post("/forgot-password", {
        email,
      });

      return {
        type: "success",
        message: response.data.message,
      };
    } catch (error: any) {
      return {
        type: "error",
        message: error?.response?.data?.message,
      };
    }
  };

  const signUp = async (data: SignUpFormData) => {
    const ref = cookies["ref"] ?? null;

    try {
      const response = await api.post("/register", {
        name: data.name,
        document: data.document,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
        ref: data.ref,
      });

      const { token_type, access_token, user: userInfo } = response.data;

      api.defaults.headers["Authorization"] = `${token_type} ${access_token}`;

      setToken(access_token);
      setUser(userInfo);

      router.refresh();

      return {
        type: "success",
        message: "Cadastro efetuado com sucesso!",
      };
    } catch (error: any) {
      return {
        type: "error",
        message: error?.response?.data?.message,
        errors: error?.response?.data?.errors,
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token_type, access_token, user: userInfo } = response.data;

      api.defaults.headers["Authorization"] = `${token_type} ${access_token}`;

      setToken(access_token);
      setUser(userInfo);

      router.refresh();

      return {
        type: "success",
        message: "Login efetuado com sucesso!",
      };
    } catch (error: any) {
      return {
        type: "error",
        message: error?.response?.data?.message,
      };
    }
  };

  const signOut = () => {
    destroyCookie(undefined, "bet.token", {
      path: "/",
    });

    delete api.defaults.headers["Authorization"];

    setToken(null);
    setUser(null);

    router.refresh();
  };

  const fetchMe = async () => {
    await api.get("/me").then((response) => {
      setUser(response.data.user);
    });
  };

  useEffect(() => {
    if (token) {
      fetchMe();
    }

    if (refUrl?.length && refUrl !== ref) {
      setRef(refUrl);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLogged: !!token && !!user,
        forgotPassword,
        resetPassword,
        signUp,
        signIn,
        signOut,
        fetchMe,
        setUser,
        setToken,
        ref,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth está fora de ThemeProvider.");
  }
  return context;
};
