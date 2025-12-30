"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "./useAuthStor";

export default function Navbar() {
  const router = useRouter();
  const { user, token, clearAuth } = useAuthStore();

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 h-16 w-full bg-blue-200 shadow">
      
  
      <Link href="/" className="text-xl font-bold">
        Home
      </Link>

 
      <div className="flex items-center gap-4">

        {!token && (
          <>
            <Link href="/login">
              <Button variant="link">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="link">Signup</Button>
            </Link>
          </>
        )}

        {token && user?.role === "ADMIN" && (
          <>
            <Button variant="link" onClick={() => router.push("/adminDashboard")}>
              Dashboard
            </Button>
          </>  
        )}

        {token && user?.role === "USER" && (
          <>
            <Button variant="link" onClick={() => router.push("/user")}>
              My Profile
            </Button>
          </>
        )}


        {token && user && (
          <span className="text-sm font-medium">
            {user.name} ({user.role})
          </span>
        )}


        {token && (
          <Button onClick={handleLogout} className="bg-blue-500">
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}
