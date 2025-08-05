// app/context/WishlistContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from '@/app/types/cart'; // or define a WishlistItem type

type WishlistItem = Omit<CartItem, 'amount'>;

type WishlistContextType = {
  wishlist: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (item: WishlistItem) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prevWishlist) => {
      const isItemInWishlist = prevWishlist.some(wishlistItem => wishlistItem.id === item.id && wishlistItem.size === item.size );
      if (isItemInWishlist) {
        return prevWishlist.filter(wishlistItem => wishlistItem.id !== item.id);
      } else {
        return [...prevWishlist, item];
      }
    });
  }

  const isInWishlist = (item: WishlistItem) => {
    return wishlist.some(wishlistItem => wishlistItem.id === item.id && wishlistItem.size === item.size);
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
