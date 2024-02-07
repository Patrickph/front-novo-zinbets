"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLogged } = useAuth();

  const { push } = useRouter();

  useEffect(() => {
    if (!isLogged) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged]);

  return <>{children}</>;
}
