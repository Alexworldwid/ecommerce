import Header from "@/app/component/layout/header";
import Nav from "../component/layout/nav";
import Footer from "../component/layout/footer";
import { Toaster } from "react-hot-toast";
// import MobileMenu from "../component/ui/mobileMenu";
import { MenuProvider } from "../context/menuContext";
import { ProductProvider } from "../context/productContext";
import { SearchProvider } from "../context/searchContext";
import { createClient } from "@/utils/supabase/server";
import {ReactNode} from "react";
import { AppProvider } from "../provider";






export default async function shopLayout ({children}: Readonly<{
    children: ReactNode;
  }>) {

    const supabase = await createClient();
    const {data: { user}} = await supabase.auth.getUser();

    return (
        <div className="relative">
            <AppProvider>
            <MenuProvider >
            <ProductProvider>
            <SearchProvider>
                <Header />
                <Nav initialUser={user} />
                <main className="flex flex-col items-center justify-center w-full">
                    {children}
                </main>
                <Footer />
                <Toaster position="top-center" />
            </SearchProvider>
            </ProductProvider>
            </MenuProvider>
            </AppProvider>
        </div>
    )
    
}

