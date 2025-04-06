"use client";
import Link from "next/link";
import React, { useState } from "react";
import * as motion from "motion/react-client";
import Input from "@/components/auth/Input";
import { useRegister } from "@/hooks/useRegister";

function page() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const register = useRegister();

  function handleRegister() {
    if (!fullName || !email || !password) {
      return;
    }
    register.mutate({ fullName, email, password });
  }

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 200 }}
        exit={{ opacity: 0, scale: 0.7, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-80 h-100 lg:w-95 lg:h-110 bg-white shadow-md rounded-2xl flex flex-col justify-between items-center p-5 text-black font-[Montserrat]"
      >
        <h1 className="text-2xl font-semibold">Register</h1>
        <div className="flex flex-col gap-5 w-full">
          <Input
            type="text"
            name="FullName"
            id="FullName"
            placeholder="Enter your full name..."
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <button
            className="py-1.5 px-15 rounded-lg bg-black text-white cursor-pointer"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default page;
