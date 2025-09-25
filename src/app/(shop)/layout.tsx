import Header from "@/app/component/layout/header";
import Nav from "../component/layout/nav";
import Footer from "../component/layout/footer";
import { Toaster } from "react-hot-toast";
// import MobileMenu from "../component/ui/mobileMenu";
import { MenuProvider } from "../context/menuContext";
import { ProductProvider } from "../context/productContext";
import { CartProvider } from "../context/cartContext";
import { WishlistProvider } from "../context/wishlistContext";
import { SearchProvider } from "../context/searchContext";
import { createClient } from "@/utils/supabase/server";




export default async function shopLayout ({children}: Readonly<{
    children: React.ReactNode;
  }>) {

    const supabase = await createClient();
    const {data: { user}} = await supabase.auth.getUser();

    return (
        <div className="relative">
            <MenuProvider >
            <ProductProvider>
            <CartProvider>
            <WishlistProvider>
            <SearchProvider>
                <Header />
                <Nav initialUser={user} />
                <main className="flex flex-col items-center justify-center w-full">
                    {children}
                </main>
                <Footer />
                <Toaster position="top-center" />
            </SearchProvider>
            </WishlistProvider>
            </CartProvider>
            </ProductProvider>
            </MenuProvider>
        </div>
    )
    
}

