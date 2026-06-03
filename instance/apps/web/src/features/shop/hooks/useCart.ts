import { create } from 'zustand';
import type { IProduct } from '@elo-instance/core';

export interface CartItem extends IProduct {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: IProduct) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (product) => 
    set((state) => {
      const existingItem = state.items.find((item) => item._id === product._id);
      let newItems;
      if (existingItem !== undefined) {
        newItems = state.items.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }
      
      const newTotal = newItems.reduce((acc, item) => acc + (Number(item.measure.value) * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }),
  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((item) => item._id !== productId);
      const newTotal = newItems.reduce((acc, item) => acc + (Number(item.measure.value) * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }),
  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        const newItems = state.items.filter((item) => item._id !== productId);
        const newTotal = newItems.reduce((acc, item) => acc + (Number(item.measure.value) * item.quantity), 0);
        return { items: newItems, total: newTotal };
      }
      const newItems = state.items.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce((acc, item) => acc + (Number(item.measure.value) * item.quantity), 0);
      return { items: newItems, total: newTotal };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));
