import { Product } from "@/store/store";
import { CrossIcon, SquareArrowOutUpRightIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import StarRating from "./Stars";

function Card({ product }: { product: Product }) {
  return (
    <div
      key={product.id}
      className="w-75 h-100 flex flex-col justify-between items-center bg-white shadow-xl rounded-xl p-4"
    >
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
            <StarRating rating={product.rating.rate} size={4} />
            <h2 className="text-yellow-500 text-base">
              {product.rating.count}
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <Link
            href={`product/${product.id}`}
            className="px-5 py-2 bg-black text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg"
          >
            View
            <SquareArrowOutUpRightIcon size={14} />
          </Link>
          <button className="px-5 py-2 bg-black text-white cursor-pointer text-sm flex items-center gap-2 rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
