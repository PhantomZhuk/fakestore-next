import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/localStorageUtils";
import { p } from "framer-motion/client";
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

export interface CartProduct extends Product {
  quantity: number;
}

interface StoreState {
  product: CartProduct[];
  getProduct: (id: number) => CartProduct | undefined;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  deleteProduct: (id: number) => void;
  clearProduct: () => void;
  getProducts: () => CartProduct[];
  getProductCount: () => number;
  getProductTotal: () => number;
}

const CART_KEY = "cart";

export const useStore = create<StoreState>((set, get) => ({
  product: getLocalStorage(CART_KEY) || [],

  getProduct(id: number) {
    const product = get().product.find((item) => item.id === id);
    if (product) {
      return product;
    } else {
      return undefined;
    }
  },

  addProduct: (newProduct: Product) => {
    set(() => {
      const exists = get().product.some((item) => item.id === newProduct.id);
      if (exists) {
        const updatedProduct = get().product.map((product) => {
          if (product.id === newProduct.id) {
            if (product.quantity < 99) {
              return { ...product, quantity: product.quantity + 1 };
            } else {
              return product;
            }
          }
          return product;
        });

        setLocalStorage(CART_KEY, updatedProduct);
        return { product: updatedProduct };
      } else {
        const product = { ...newProduct, quantity: 1 };
        const updatedProduct = [...get().product, product];
        setLocalStorage(CART_KEY, updatedProduct);
        return { product: updatedProduct };
      }
    });
  },

  removeProduct: (id: number) => {
    set(() => {
      const updatedProduct = get()
        .product.map((product) => {
          if (product.id === id) {
            if (product.quantity > 1) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return null;
            }
          }
          return product;
        })
        .filter((product) => product !== null);

      setLocalStorage(CART_KEY, updatedProduct);
      return { product: updatedProduct };
    });
  },

  deleteProduct: (id: number) => {
    set(() => {
      const updatedProduct = get().product.filter(
        (product) => product.id !== id
      );

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

  getProducts: () => {
    return get().product;
  },

  getProductCount: () => {
    return get().product.length;
  },

  getProductTotal: () => {
    return get().product.reduce((total, item) => total + item.price, 0);
  },
}));
