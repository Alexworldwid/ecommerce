'use client';

import { useState, useContext, createContext, ReactNode } from 'react';

type MenuContextType = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  setIsMenuOpen?: (isOpen: boolean) => void; // Optional setter for external control
};

type MenuProviderProps = {
  children: ReactNode;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu, setIsMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextType => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};