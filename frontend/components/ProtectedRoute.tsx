"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/components/useAuthStor";

type Props = {
  children: React.ReactNode;
  allowedRoles?: ("ADMIN" | "USER")[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { token, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!token || !user) {
      router.replace("/login");
      return;
    }

    // role not allowed
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      router.replace("/login");
    }
  }, [token, user, allowedRoles, router]);


  if (!token || !user) return null;

  if (allowedRoles && !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
