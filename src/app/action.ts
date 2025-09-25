"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function signUp(
    prevState: {error: string | null; message: string | null},
    formData: FormData
): Promise<{ error: string | null; message: string | null }> {
    const supabase = await createClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const {error} = await supabase.auth.signUp({email, password});

    if (error) {
        return {error: error.message, message: null};
    }

    revalidatePath("/", "layout");
    return {
        error: null,
        message: "Signup successful! Please check your email for a confirmation link.",
    }    
}

export async function login(
  prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const supabase = await createClient()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signOutAction () {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}

export async function signInWithGoogleAction() {
    const supabase = await createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `http://localhost:3001/auth/callback`, // must match dashboard
        },
    });
    
    if (error) {
        throw new Error(error.message);
    }
    
    if (data.url) {
        // Redirect the user to the Google sign-in page
        redirect(data.url);
    }
}




export async function resetPassword(
  prevState: { error: string | null; message: string | null },
  formData: FormData
): Promise<{ error: string | null; message: string | null }> {
  const supabase = await createClient()
  const email = formData.get("email") as string

  const { error } = await supabase.auth.resetPasswordForEmail(email)

  if (error) {
    return { error: error.message, message: null }
  }

  return {
    error: null,
    message: "Password reset email sent! Please check your inbox.",
  }
}



export async function updatePassword(
  prevState: { error: string | null; message: string | null },
  formData: FormData
): Promise<{ error: string | null; message: string | null }> {

  const supabase = await createClient()
  const password = formData.get("password") as string
  const { error } = await supabase.auth.updateUser({ password: password })

  if (error) {
    return { error: error.message, message: null }
  }

  return { error: null, message: "Password updated successfully!" }
}