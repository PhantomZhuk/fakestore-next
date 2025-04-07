"use client";
import { CartProduct, useStore } from "@/store/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StarRating from "./Stars";
import Link from "next/link";
import {
  MinusIcon,
  PlusIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from "lucide-react";

function CardCart({ product }: { product: CartProduct }) {
  const [isClient, setIsClient] = useState(false);

  const addProduct = useStore((state) => state.addProduct);
  const removeProduct = useStore((state) => state.removeProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const handleIncreaseAmountProduct = () => {
    addProduct(product);
    console.log(product.quantity);
  };

  const handleReduceAmountProduct = () => {
    removeProduct(product.id);
    console.log(product.quantity);
  };

  const handleDeleteProduct = () => {
    deleteProduct(product.id);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-75 min-h-110 flex flex-col justify-between items-center bg-white text-black shadow-xl rounded-xl p-4">
      <div className="w-full h-[70%] flex justify-center items-center">
        <Image
          src={product.image}
          alt={product.title}
          width={120}
          height={100}
        ></Image>
      </div>
      <div className="w-full h-[30%] flex flex-col justify-between items-start">
        <h2 className="w-full mr-100 text-base font-medium font-[Montserrat] overflow-hidden text-ellipsis h-12 whitespace-nowrap">
          {product.title}
        </h2>
        <div className="w-full flex items-center justify-between my-3">
          <div>
            Price: <span className="text-green-500">{product.price}$</span>
          </div>
          <div className="flex gap-1 items-center">
            <StarRating rating={product.rating?.rate ?? 0} size={4} />
            <h2 className="text-yellow-500 text-base">
              {product.rating?.count ?? 0}
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <Link
            href={`/product/${product.id}`}
            className="px-4 py-2 bg-black text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg"
          >
            View
            <SquareArrowOutUpRightIcon size={14} />
          </Link>
          <div className="flex items-center gap-2 bg-gray-200 p-0.5 rounded-lg">
            <button
              className="p-1.5 bg-black text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg"
              onClick={handleIncreaseAmountProduct}
            >
              <PlusIcon size={20} />
            </button>
            <p className="text-lg">{product.quantity}</p>
            <button
              className="p-[7px] bg-black text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg"
              onClick={handleReduceAmountProduct}
            >
              <MinusIcon size={20} />
            </button>
          </div>
          <button
            className="p-[7px] hover:bg-red-500 bg-red-900 text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg"
            onClick={handleDeleteProduct}
          >
            <Trash2Icon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
