import { Product } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProductById = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ["product"],
    queryFn: async () => {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    },
  });
};
