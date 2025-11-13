import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import CheckoutClient from "./checkoutClient";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Welcome to Eccomerce home page',
  openGraph: {
    title: 'Eccomerce checkout',
    description: 'Welcome to Eccomerce, your one stop shop for amenities',
    url: 'https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/',
    siteName: 'Eccomerce homepage',
    images: [
      {
        url: 'https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eccomerce checkout',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}

export default async function CheckoutPage() {
  const supabase = await createClient();
  const {
    data: {user}
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <CheckoutClient />;
}