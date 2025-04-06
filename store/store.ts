import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localStorageUtils";
import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface StoreState {
  product: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  clearProduct: () => void;
  getProduct: () => Product[];
  getProductCount: () => number;
  getProductTotal: () => number;
}

const CART_KEY = "cart";

export const useStore = create<StoreState>((set) => ({
  product: getLocalStorage(CART_KEY) || [],

  addProduct: (newProduct: Product) => {
    set((state) => {
      const updatedProduct = [...state.product, newProduct];
      setLocalStorage(CART_KEY, updatedProduct);
      return { product: updatedProduct };
    });
  },

  removeProduct: (id: number) => {
    set((state) => {
      const updatedProduct = state.product.filter((item) => item.id !== id);
      setLocalStorage(CART_KEY, updatedProduct);
      return { product: updatedProduct };
    });
  },

  clearProduct: () => {
    set(() => {
      removeLocalStorage(CART_KEY);
      return { product: [] };
    });
  },

  getProduct: () => getLocalStorage(CART_KEY) || [],

  getProductCount: () => {
    const products = getLocalStorage(CART_KEY) || [];
    return products.length;
  },

  getProductTotal: () => {
    const products = getLocalStorage(CART_KEY) || [];
    return products.reduce(
      (total: number, item: Product) => total + item.price,
      0
    );
  },
}));
