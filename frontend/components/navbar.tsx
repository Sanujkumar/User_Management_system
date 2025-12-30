"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "./useAuthStor";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const { user, token, clearAuth } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuth();
    router.push("/login");
    setOpen(false);
  };

  return (
    <nav className="w-full bg-blue-200 shadow px-4 md:px-6">
      <div className="flex justify-between items-center h-16">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          {!token && (
            <>
              <Link href="/login"><Button variant="link">Login</Button></Link>
              <Link href="/signup"><Button variant="link">Signup</Button></Link>
            </>
          )}

          {token && user?.role === "ADMIN" && (
            <Button variant="link" onClick={() => router.push("/adminDashboard")}>
              Dashboard
            </Button>
          )}

          {token && user?.role === "USER" && (
            <Button variant="link" onClick={() => router.push("/user")}>
              My Profile
            </Button>
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-2 pb-4">

          {!token && (
            <>
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full">Login</Button>
              </Link>
              <Link href="/signup" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full">Signup</Button>
              </Link>
            </>
          )}

          {token && user?.role === "ADMIN" && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                router.push("/adminDashboard");
                setOpen(false);
              }}
            >
              Dashboard
            </Button>
          )}

          {token && user?.role === "USER" && (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => {
                router.push("/user");
                setOpen(false);
              }}
            >
              My Profile
            </Button>
          )}

          {token && user && (
            <span className="text-sm text-center font-medium">
              {user.name} ({user.role})
            </span>
          )}

          {token && (
            <Button onClick={handleLogout} className="bg-blue-500 w-full">
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );  
}
  