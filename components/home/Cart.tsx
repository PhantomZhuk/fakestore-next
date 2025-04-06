"use client";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useStore } from "@/store/store";
import { ShoppingCartIcon, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Cart() {
  const { isMobile, mounted } = useMaxWidth(768);
  const getProductCount = useStore((state) => state.getProductCount());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <ShoppingCartIcon />
        <span className="w-5 h-5 rounded-2xl absolute mt-[-35px] ml-[15px] flex items-center justify-center text-white text-sm font-[Montserrat] bg-red-700">
          {getProductCount}
        </span>
      </button>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 right-0 z-50 ${
          mounted && (isMobile ? "w-full" : "w-[400px] rounded-s-lg")
        } h-[100dvh] bg-white shadow-lg p-4 flex flex-col justify-between gap-2`}
      >
        <div className="flex items-center justify-between">
          <X
            className="cursor-pointer text-black font-medium font-[Montserrat]"
            size={30}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="w-full h-[85dvh] flex flex-col gap-2 overflow-y-auto scrollbar-none"></div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-black text-white font-[Montserrat] font-medium py-1.5 rounded-lg px-15 cursor-pointer">
            Buy
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Cart;
