"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Products } from "../types/product";

type ProductContextType = {
  products: Products[];
  loading: boolean;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true); // start as true

  // Fetch all products once
  useEffect(() => {
    let isMounted = true; // guard in case component unmounts

    const fetchProducts = async () => {
      try {
        const res = await fetch("/data/products.json"); // Or your API URL
        const data = await res.json();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        if (isMounted) {
          setLoading(false); // only update if still mounted
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
