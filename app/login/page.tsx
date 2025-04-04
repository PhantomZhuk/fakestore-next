import Link from "next/link";
import React from "react";
import * as motion from "motion/react-client";

function page() {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100 px-2">
      <motion.div
        initial={{ opacity: 0, scale: 0.7, y: 200 }}
        exit={{ opacity: 0, scale: 0.7, y: 200 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-80 h-90 lg:w-90 lg:h-100 bg-white shadow-md rounded-2xl flex flex-col justify-between items-center p-5 text-black font-[Montserrat]"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <div className="flex flex-col gap-5 w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className="text-black border border-[#cccccc] rounded-lg p-2.5 shadow-sm outline-none text-sm"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            className="text-black border border-[#cccccc] rounded-lg p-3 shadow-sm outline-none text-sm"
          />
        </div>
        <div className="flex flex-col items-center gap-5 w-full">
          <button className="py-1.5 px-15 rounded-lg bg-black text-white cursor-pointer">
            Login
          </button>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="underline">
              Register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default page;
