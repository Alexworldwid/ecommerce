import BestSellers from "../component/layout/bestSellers";
import Cta from "../component/layout/cta";
import Features from "../component/layout/features";
import Hero from "../component/layout/hero";
import Sales from "../component/layout/sales";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to our eccomerce home page',
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Next.js',
    description: 'The React Framework for the Web',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
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
