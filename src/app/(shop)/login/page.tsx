import ClientFormLogin from '@/app/component/forms/clientFormLogin';
import SignInWithGoogle from '@/app/component/forms/signInWithGoogle';
import PageIndicator from '@/app/component/ui/pageIndicator';
import { Metadata } from 'next';
import React from 'react';


export const metadata: Metadata = {
  title: 'Login',
  description: 'Welcome to Eccomerce home page',
  openGraph: {
    title: 'Eccomerce Login',
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
    title: 'Eccomerce Login',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}





const Login = () => {
    return (
        <section className='pt-[130px] w-full flex flex-col items-center gap-14'>
            <article className='w-full flex flex-col items-center bg-neutral-100 py-10'>
                <div className='w-full max-w-[1113px] flex flex-col px-3 gap-1'>
                    <h2 className='font-semibold text-2xl font-inter'>Login</h2>
                    <PageIndicator pageTitle='Login' />
                </div>
            </article>

            <article className='w-full max-w-[520px] flex flex-col items-center px-3 gap-4'>
                <SignInWithGoogle />
                <div className='w-full flex items-center gap-2'>
                    <div className='w-[45%] h-[1px] bg-neutral-600'></div>
                    <span className='text-zinc-600 text-sm font-medium font-inter leading-normal'>OR</span>
                    <div className='w-[45%] h-[1px] bg-neutral-600'></div>
                </div>
                <ClientFormLogin />
            </article>
        </section>
    );
};

export default Login;