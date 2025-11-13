// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { createClient } from "@/utils/supabase/client"; 
// import type { Products } from "../types/product";

// type ProductContextType = {
//   products: Products[];
//   loading: boolean;
// };

// const ProductContext = createContext<ProductContextType | undefined>(undefined);

// export const ProductProvider = ({ children }: { children: ReactNode }) => {
//   const [products, setProducts] = useState<Products[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let isMounted = true;
//     const supabase = createClient();

//     const fetchProducts = async () => {
//       try {
//         const { data, error } = await supabase.from("products").select("*");

//         if (error) throw error;
//         if (isMounted && data) {
//           setProducts(data);
//         }
//       } catch (err) {
//         console.error("Failed to fetch products:", err);
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchProducts();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <ProductContext.Provider value={{ products, loading }}>
//       {children}
//     </ProductContext.Provider>
//   );
// };

// export const useProducts = () => {
//   const context = useContext(ProductContext);
//   if (!context) {
//     throw new Error("useProducts must be used within a ProductProvider");
//   }
//   return context;
// };
