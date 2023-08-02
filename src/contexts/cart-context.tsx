import React from "react";
import { CartMeal } from "./CartProvider";

interface ContextValue {
  items: CartMeal[],
  totalAmount: number,
  addItem: (item: CartMeal) => void,
  removeItem: (id: string) => void,
  clearCart: () => void,
}

export const CartContext = React.createContext<ContextValue>({
  items: [],
  totalAmount: 0,
  addItem: (item: CartMeal) => {},
  removeItem: (id: string) => {},
  clearCart: () => {},
})