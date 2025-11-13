import PageIndicator from '@/app/component/ui/pageIndicator';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


export const metadata: Metadata = {
  title: 'Cart',
  description: 'Welcome to Eccomerce successful order page',
  openGraph: {
    title: 'Eccomerce Successful Order',
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
    title: 'Eccomerce successful order',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}


const SuccessfulOrder = () => {
    return (
        <section className='pt-[130px] w-full flex flex-col items-center justify-center gap-8'>
            <article className='bg-gray-300 w-full flex items-center justify-center'>
                <div className='w-full max-w-[1113px] px-3 py-10'>
                    <h2 className='text-gray-900 text-2xl font-bold font-inter'>Successful Order</h2>
                    <PageIndicator pageTitle='Successful Order' />
                </div>
            </article>
            
            <article className='h-[500px] w-full flex flex-col gap-6 justify-center items-center'>
                <div className='relative w-36 h-32'>
                    <Image src="/images/succesful.png" alt='success' fill />
                </div>
                <div>
                    <h2 className='justify-start text-gray-900 text-2xl font-bold font-inter'>Thank you for shopping</h2>
                </div>
                <div>
                    <p className='text-center justify-start text-gray-600 text-sm font-normal font-inter leading-normal'>Your order has been successfully placed and is now being processed.</p>
                </div>
                <div>
                    <Link href="/" className='px-6 py-3 bg-gray-900 rounded inline-flex justify-start items-center gap-1.5 text-white text-sm font-medium font-inter leading-normal transition-all duration-150 ease-in hover:bg-black/80 group'>Go to my account 
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-white transition-all duration-150 ease-in group-hover:translate-x-1" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
                    </Link>
                </div>
            </article>
        </section>
    );
};

export default SuccessfulOrder;