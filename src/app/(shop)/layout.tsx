import Header from "@/app/component/ui/header";
import Nav from "../component/ui/nav";
import Footer from "../component/ui/footer";
import { Toaster } from "react-hot-toast";
// import MobileMenu from "../component/ui/mobileMenu";
import { MenuProvider } from "../context/menuContext";
import { ProductProvider } from "../context/productContext";
import { CartProvider } from "../context/cartContext";
import { WishlistProvider } from "../context/wishlistContext";


export default function shopLayout ({children}: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="relative">
            <MenuProvider >
            <ProductProvider>
            <CartProvider>
            <WishlistProvider>
                <Header />
                <Nav />
                <main className="flex flex-col items-center justify-center w-full">
                    {children}
                </main>
                <Footer />
                <Toaster position="top-center" />
            </WishlistProvider>
            </CartProvider>
            </ProductProvider>
            </MenuProvider>
        </div>
    )
    
}