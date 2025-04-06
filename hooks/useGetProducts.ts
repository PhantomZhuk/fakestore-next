import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "@/store/store";

export const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    },
  });
};
