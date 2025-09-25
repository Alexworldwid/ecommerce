"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; 
import { User } from "@supabase/supabase-js";

export default function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const check = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
    };
    check();

    const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
        setUser(session?.user ?? null);
        }
    );

    return () => subscription.subscription.unsubscribe();
    }, [supabase]);

  return user;
}