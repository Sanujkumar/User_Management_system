"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useAuthStore } from "@/components/useAuthStor";


export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 relative overflow-hidden px-4">
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply blur-3xl opacity-40"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply blur-3xl opacity-40"
        animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center z-10 max-w-2xl"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
        >
          User Management System
        </motion.h1>

        <p className="mt-4 text-gray-700 text-lg md:text-xl">
          A secure platform to manage users, roles and profiles.
          Built for <span className="font-semibold">Admins</span> &{" "}
          <span className="font-semibold">Users</span>.
        </p>
        {!user && (
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="px-8 py-3 rounded-xl">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="px-8 py-3 rounded-xl">
                Create Account
              </Button>
            </Link>
          </div>
        )}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <Image
            src="https://illustrations.popsy.co/amber/man-riding-a-rocket.svg"
            alt="User management"
            width={220}
            height={220}
            className="drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>


      <footer className="absolute bottom-4 text-sm text-gray-500">
        © {new Date().getFullYear()} User Management System — Built by{" "}
        <span className="font-medium">Sanuj Kumar</span>
      </footer>
    </div>
  );
}
