"use client";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { CartProduct, useStore } from "@/store/store";
import { ShoppingCartIcon, X } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CardCart from "./CardCart";

function Cart() {
  const { isMobile, mounted } = useMaxWidth(768);
  const productCount = useStore((state) => state.getProductCount());
  const products = useStore((state) => state.getProducts());
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <ShoppingCartIcon />
        {mounted && (
          <span className="w-5 h-5 rounded-2xl absolute mt-[-35px] ml-[15px] flex items-center justify-center text-white text-sm font-[Montserrat] bg-red-700">
            {productCount}
          </span>
        )}
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
        <div className="w-full h-[90dvh] flex flex-col items-center gap-2 overflow-y-auto scrollbar-none py-3">
          {products.map((product: CartProduct) => (
            <CardCart key={product.id * 100} product={product} />
          ))}
        </div>
        <div className="w-full flex justify-center items-center">
          <button className="bg-black text-white font-[Montserrat] font-medium py-1.5 px-3.5 rounded-lg cursor-pointer">
            Buy
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Cart;
