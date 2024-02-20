"use client";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

type PageProps = {
  params: {
    token: string;
  };
};

export default function AuthTokenPage({ params }: PageProps) {
  const { push } = useRouter();
  const search = useSearchParams();

  const { setUser, setToken, fetchMe, user } = useAuth();
  const token = decodeURIComponent(params.token);
  const redirect = search.get("redirect") || "/";

  if (!token) {
    push("/");
  }

  delete api.defaults.headers["Authorization"];

  setToken(token);
  setUser(user);

  api.defaults.headers["Authorization"] = `Bearer ${token}`;

  fetchMe();

  push(redirect);
}
