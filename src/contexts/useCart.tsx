import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext.tsx';
import { API_ENDPOINTS } from '../config/apiConfig';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getSubtotal: () => number;
  refreshCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper para obtener headers con JWT
const getAuthHeaders = (token: string | null) => {
  console.log('useCart.getAuthHeaders token', token);
  if (!token) return null;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Trae el carrito del backend
  const refreshCart = async () => {
    try {
      const authHeaders = getAuthHeaders(token);
      if (!authHeaders) {
        console.warn('No auth token found, cannot refresh cart.');
        setCartItems([]);
        return;
      }

      const res = await fetch(`${API_ENDPOINTS.CART}`, {
        credentials: 'include',
        headers: authHeaders,
      });
      
      if (!res.ok) {
        console.error('Failed to fetch cart: HTTP', res.status);
        setCartItems([]);
        return;
      }
      
      const data = await res.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setCartItems(data);
      } else if (Array.isArray(data.items)) {
        setCartItems(data.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Failed to fetch cart', err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    if (token) {
      refreshCart();
    } else {
      setCartItems([]);
    }
  }, [token]);

  const addToCart = async (item: CartItem) => {
    const authHeaders = getAuthHeaders(token);
    if (!authHeaders) {
      throw new Error('Debes iniciar sesión para añadir productos al carrito.');
    }

    // Optimistic update
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });

    try {
      console.log('useCart.addToCart headers', authHeaders);
      const res = await fetch(`${API_ENDPOINTS.CART}/${item.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders,
      });
      console.log('useCart.addToCart response', res.status, res.statusText);
      if (!res.ok) {
        throw new Error(`Failed to add to cart: HTTP ${res.status}`);
      }
      await refreshCart();
    } catch (err) {
      console.error('Failed to add to cart', err);
      await refreshCart(); // revertir en caso de error
      throw err;
    }
  };

  const removeFromCart = async (itemId: string) => {
    const authHeaders = getAuthHeaders(token);
    if (!authHeaders) {
      throw new Error('Debes iniciar sesión para modificar el carrito.');
    }

    setCartItems(prev => prev.filter(i => i.id !== itemId));

    try {
      const res = await fetch(`${API_ENDPOINTS.CART}/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: authHeaders,
      });
      if (!res.ok) {
        throw new Error(`Failed to remove from cart: HTTP ${res.status}`);
      }
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove from cart', err);
      await refreshCart();
      throw err;
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    const authHeaders = getAuthHeaders(token);
    if (!authHeaders) {
      throw new Error('Debes iniciar sesión para modificar el carrito.');
    }

    setCartItems(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );

    try {
      const res = await fetch(`${API_ENDPOINTS.CART}/${itemId}?quantity=${quantity}`, {
        method: 'PUT',
        credentials: 'include',
        headers: authHeaders,
      });
      if (!res.ok) {
        throw new Error(`Failed to update quantity: HTTP ${res.status}`);
      }
      await refreshCart();
    } catch (err) {
      console.error('Failed to update quantity', err);
      await refreshCart();
      throw err;
    }
  };

  const clearCart = async () => {
    const authHeaders = getAuthHeaders(token);
    if (!authHeaders) {
      throw new Error('Debes iniciar sesión para modificar el carrito.');
    }

    setCartItems([]);
    try {
      const res = await fetch(`${API_ENDPOINTS.CART}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: authHeaders,
      });
      if (!res.ok) {
        throw new Error(`Failed to clear cart: HTTP ${res.status}`);
      }
      await refreshCart();
    } catch (err) {
      console.error('Failed to clear cart', err);
      await refreshCart();
      throw err;
    }
  };

  const getSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = React.useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};