import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext.tsx';
import { API_ENDPOINTS } from '../config/apiConfig';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  refreshWishlist: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (itemId: string) => void;
  isInWishlist: (itemId: string) => boolean;
}

export const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Helper para obtener headers con JWT
const getAuthHeaders = (token: string | null) => {
  if (!token) return null;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const wishlistCount = wishlistItems.length;

  // Trae la wishlist de la API
  const refreshWishlist = async () => {
    try {
      const authHeaders = getAuthHeaders(token);
      if (!authHeaders) {
        console.warn('No auth token found, cannot refresh wishlist.');
        setWishlistItems([]);
        return;
      }

      const res = await fetch(`${API_ENDPOINTS.WISHLIST}`, {
        credentials: 'include',
        headers: authHeaders,
      });
      const data = await res.json();

      if (Array.isArray(data)) {
        setWishlistItems(data);
      } else if (Array.isArray(data.wishlist)) {
        setWishlistItems(data.wishlist);
      } else {
        setWishlistItems([]);
      }
    } catch (err) {
      console.error('Failed to fetch wishlist', err);
      setWishlistItems([]);
    }
  };

  const addToWishlist = async (item: WishlistItem) => {
    const authHeaders = getAuthHeaders(token);
    if (!authHeaders) {
      throw new Error('Debes iniciar sesión para añadir productos a la wishlist.');
    }

    try {
      const res = await fetch(`${API_ENDPOINTS.WISHLIST}/${item.id}`, {
        method: 'POST',
        credentials: 'include',
        headers: authHeaders,
      });

      if (!res.ok) throw new Error('Failed to add to wishlist');

      await refreshWishlist();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

const removeFromWishlist = async (itemId: string) => {
  const authHeaders = getAuthHeaders(token);
  if (!authHeaders) {
    throw new Error('Debes iniciar sesión para modificar la wishlist.');
  }

  try {
    const res = await fetch(`${API_ENDPOINTS.WISHLIST}/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: authHeaders,
    });

    if (!res.ok) throw new Error('Failed to remove from wishlist');

    await refreshWishlist();
  } catch (err) {
    console.error(err);
    throw err;
  }
};

  const isInWishlist = (itemId: string) => wishlistItems.some(item => item.id === itemId);

  // Refresh wishlist when auth token becomes available or changes
  useEffect(() => {
    if (token) {
      refreshWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [token]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount,
        refreshWishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
