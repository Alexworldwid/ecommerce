import BestSellers from "../component/layout/bestSellers";
import Cta from "../component/layout/cta";
import Features from "../component/layout/features";
import Hero from "../component/layout/hero";
import Sales from "../component/layout/sales";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Eccomerce home page',
  openGraph: {
    title: 'Eccomerce',
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
    title: 'Eccomerce',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}



export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BestSellers />
      <Cta />
      <Sales />
    </>
  );
}
