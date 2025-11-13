import type { Metadata } from 'next'
import HomePageContent from '../component/layout/homePageContent';



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
    <HomePageContent/>
  );
}
