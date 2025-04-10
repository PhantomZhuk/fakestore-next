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
    return get().product.find((item) => item.id === id);
  },

  addProduct: (newProduct: Product) => {
    set((state) => {
      const exists = state.product.some((item) => item.id === newProduct.id);
      let updatedProduct;
      if (exists) {
        updatedProduct = state.product.map((product) => {
          if (product.id === newProduct.id && product.quantity < 99) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      } else {
        updatedProduct = [...state.product, { ...newProduct, quantity: 1 }];
      }
      setLocalStorage(CART_KEY, updatedProduct);
      return { product: updatedProduct };
    });
  },

  removeProduct: (id: number) => {
    set((state) => {
      const updatedProduct = state.product
        .map((product) => {
          if (product.id === id) {
            if (product.quantity > 1) {
              return { ...product, quantity: product.quantity - 1 };
            } else {
              return null;
            }
          }
          return product;
        })
        .filter((product) => product !== null) as CartProduct[];

      setLocalStorage(CART_KEY, updatedProduct);
      return { product: updatedProduct };
    });
  },

  deleteProduct: (id: number) => {
    set((state) => {
      const updatedProduct = state.product.filter(
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

  getProducts: () => get().product,

  getProductCount: () => get().product.length,

  getProductTotal: () => {
    return get().product.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
  },
}));
