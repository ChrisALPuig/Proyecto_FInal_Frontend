import { useContext } from 'react';
import { WishlistContext, WishlistContextType } from './WishlistContext.tsx';

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }

  return context;
};
