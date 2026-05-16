// CartContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

// Tipo de cada item del carrito
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Tipo del contexto del carrito
export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
}

// Contexto del carrito (inicialmente undefined)
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider que envuelve la app
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Total de items en el carrito
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: CartItem) => {
    console.log("Cart before:", cartItems);

    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);

      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedItems = [...prevItems, item];
      }

      console.log("Cart after:", updatedItems); // 🚀 Depuración del carrito actualizado
      return updatedItems;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== itemId);
      console.log(`Removed item ${itemId}. Cart now:`, updatedItems);
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      console.log(`Updated quantity for ${itemId}. Cart now:`, updatedItems);
      return updatedItems;
    });
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setCartItems([]);
  };

  const getSubtotal = (): number =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};