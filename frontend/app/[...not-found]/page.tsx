"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "../../components/ui/button";  
import Image from "next/image";
  
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 text-center relative overflow-hidden">
      
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        animate={{ y: [0, -15, 0], x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      
      <motion.div
        className="z-10 flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
      
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            src=""
            alt="Page not found illustration"
            width={300}
            height={300}
            className="drop-shadow-xl"
          />
        </motion.div>

        
        <motion.h1
          className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mt-6"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >   
          404
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg md:text-xl mt-4 max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </motion.p>

        
        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link href="/">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg"
            >
              Go Home
            </Button>
          </Link>
          <Link href="/login">
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-600 text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-xl"
            >
              Login
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      
      <footer className="absolute bottom-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Redeem System — Built with ❤️ by Sanuj Kumar
      </footer>
    </div>
  );
}
