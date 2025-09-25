'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem } from '@/app/types/cart';

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (target: { id: string; size: string; color: string }) => void;
  clearCart: () => void;
  increaseAmount: (id: string, size: string, color: string) => void;
  decreaseAmount: (id: string, size: string, color: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    //add to cart
    const addToCart = (newItem: CartItem) => {
      setCart(prevCart => {
        const matchIndex = prevCart.findIndex(
          item =>
            item.id === newItem.id &&
            item.size === newItem.size &&
            item.color === newItem.color
        );

        if (matchIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[matchIndex].amount += newItem.amount;
          return updatedCart;
        }

        return [...prevCart, newItem];
      });
    };

    //   remove rom cart
    const removeFromCart = ({ id, size, color }: { id: string; size: string; color: string }) => {
        setCart(prevCart =>
          prevCart.filter(
            item => !(item.id === id && item.size === size && item.color === color)
          )
        );
      };

     // increase item amount in cart
      const increaseAmount = (id: string, size: string, color: string) => {
        setCart(prevCart =>
          prevCart.map(item => {
            if (item.id === id && item.size === size && item.color === color) {
              return { ...item, amount: item.amount + 1 };
            }
            return item;
          })
        );
      };

      // decrease item amount in cart
      const decreaseAmount = (id: string, size: string, color: string) => {
        setCart(prevCart =>
          prevCart
            .map(item => {
              if (item.id === id && item.size === size && item.color === color) {
                return { ...item, amount: item.amount - 1 };
              }
              return item;
            })
            .filter(item => item.amount > 0) // remove if amount hits 0
        );
      };

    //   clear the cart
    const clearCart = () => {
        setCart([]);
      };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseAmount, decreaseAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
