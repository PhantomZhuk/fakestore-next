"use client";
import Header from "@/components/home/Header";
import StarRating from "@/components/home/Stars";
import { useGetProductById } from "@/hooks/useGetProductById";
import { useStore } from "@/store/store";
import Image from "next/image";
import React, { use } from "react";

function page({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params);
  const { isLoading, error, data } = useGetProductById(id);
  const addProduct = useStore((state) => state.addProduct);

  const handleAddToCart = () => {
    addProduct(data!);
  };

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <p className="text-white font-[Montserrat] font-medium text-3xl">
          Loading...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <p className="text-white font-[Montserrat] font-medium text-3xl">
          Error
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-between bg-white">
      <Header />
      <div className="w-full min-h-[90dvh] text-black font-[Montserrat] flex justify-between flex-col md:flex-row">
        <div className="w-full min-h-[45dvh] flex justify-center items-center">
          <Image src={data!.image} alt={data!.title} width={200} height={200} />
        </div>
        <div className="w-full min-h-[45dvh] flex flex-col justify-center items-start md:p-0 md:pr-10 p-5 gap-5">
          <h2 className="text-2xl font-bold">{data!.title}</h2>
          <p className="text-base font-normal">{data!.description}</p>
          <p className="text-lg font-medium">Category: {data!.category}</p>
          <div className="flex gap-1 items-center">
            <StarRating rating={data!.rating.rate} size={6} />
            <h2 className="text-yellow-500 text-lg">{data!.rating.count}</h2>
          </div>
          <h2 className="text-lg">
            Price: <span className="text-green-500">{data!.price}$</span>
          </h2>
          <button
            className="px-6 py-3 bg-black text-white cursor-pointer text-base flex items-center gap-2 rounded-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
