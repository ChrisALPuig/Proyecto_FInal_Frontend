import { useContext } from 'react';
import { CartContext, CartContextType } from './CartContext.tsx';

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be usado dentro de un CartProvider');
  }

  return context;
};