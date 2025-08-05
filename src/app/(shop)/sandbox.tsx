"use client";

import { useState, useContext, createContext, ReactNode } from "react";

type MenuContextType = {
    isMenuOpen: boolean;
    toggleMenu: () => void;
}

type menuProviderProps = {
    children: ReactNode;
}



const menuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider = ({ children }: menuProviderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };
    
    return (
        <menuContext.Provider value={{ isMenuOpen, toggleMenu }}>
        {children}
        </menuContext.Provider>
    );
}

export const useMenuHook = (): MenuContextType => {
    const context = useContext(menuContext);
    if (!context) {
        throw new Error("useMenuHook must be used within a menuProvider");
    }
    return context;
};