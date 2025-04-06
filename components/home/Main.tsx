"use client";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Product } from "@/store/store";
import React, { useEffect } from "react";
import Card from "./Card";

function Main() {
  const { isLoading, isError, data: products } = useGetProducts();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching products");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <p className="text-black font-[Montserrat] font-medium">Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[90dvh] flex items-center justify-center">
        <p className="text-black font-[Montserrat] font-medium">Error</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[90dvh] flex flex-wrap items-center justify-center text-black gap-3 p-5">
      {products?.map((product: Product) => (
        <Card product={product} key={product.id} />
      ))}
    </div>
  );
}

export default Main;
