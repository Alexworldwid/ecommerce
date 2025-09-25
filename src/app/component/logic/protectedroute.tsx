"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";
import { useEffect } from "react";


const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const router = useRouter();

    useEffect (() => {
        const supabase = createClient();
        
        const checkUser = async () => {
            const {
                data: {user},
            } = await supabase.auth.getUser();

            if (!user) {
                router.replace("/login")
            }
        }

        checkUser();
    }, [router])

    return (
        <>{children}</>
    );
};

export default ProtectedRoute;