import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, CartItem, Product } from '../lib/supabase';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (product: Product, size: string, color: string, quantity: number) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

const getSessionId = () => {
  let sessionId = localStorage.getItem('cart_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('cart_session_id', sessionId);
  }
  return sessionId;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshCart = async () => {
    setIsLoading(true);
    try {
      const sessionId = getSessionId();
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData?.user?.id ?? null;

      let query = supabase.from('cart_items').select('*, products(*)');
      if (currentUserId) {
        query = query.or(`session_id.eq.${sessionId},user_id.eq.${currentUserId}`);
      } else {
        query = query.eq('session_id', sessionId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (product: Product, size: string, color: string, quantity: number) => {
    try {
        const sessionId = getSessionId();
        const { data: userData } = await supabase.auth.getUser();
        const currentUserId = userData?.user?.id ?? null;

        const existingItem = cartItems.find(
          item =>
            item.product_id === product.id &&
            item.selected_size === size &&
            item.selected_color === color
        );

      if (existingItem) {
        await updateCartItem(existingItem.id, existingItem.quantity + quantity);
      } else {
        const insertPayload: {
          session_id: string;
          product_id: string;
          quantity: number;
          selected_size: string;
          selected_color: string;
          user_id?: string | null;
        } = {
          session_id: sessionId,
          product_id: product.id,
          quantity,
          selected_size: size,
          selected_color: color,
        };
        if (currentUserId) insertPayload.user_id = currentUserId;

        const { error } = await supabase.from('cart_items').insert(insertPayload);

        if (error) throw error;
        await refreshCart();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
        return;
      }

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('id', itemId);

      if (error) throw error;
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      await refreshCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      const { data: userData } = await supabase.auth.getUser();
      const currentUserId = userData?.user?.id ?? null;

      let query = supabase.from('cart_items').delete();
      if (currentUserId) query = query.or(`session_id.eq.${sessionId},user_id.eq.${currentUserId}`);
      else query = query.eq('session_id', sessionId);

      const { error } = await query;

      if (error) throw error;
      setCartItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refreshCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
