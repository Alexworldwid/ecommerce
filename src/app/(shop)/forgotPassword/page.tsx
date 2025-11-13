import ForgotPasswordForm from '@/app/component/forms/forgotPasswordForm';
import PageIndicator from '@/app/component/ui/pageIndicator';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Welcome to Eccomerce home page',
  openGraph: {
    title: 'Eccomerce Forgot Password',
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
    title: 'Eccomerce Forgot Password',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}


const ForgotPassword = () => {
    return (
        <section className='pt-[130px] w-full flex flex-col items-center gap-14'>
            <article className='w-full flex flex-col items-center bg-neutral-100 py-10'>
                <div className='w-full max-w-[1113px] flex flex-col px-3 gap-1'>
                    <h2 className='font-semibold text-2xl font-inter'>Forgot Password</h2>
                    <PageIndicator pageTitle='Forgot Password' />
                </div>
            </article>

            <article className='w-full max-w-[520px] flex flex-col items-center px-3 gap-4'>
                <p>Please enter the email address associated with your account. We&apos;ll promptly send you a link to reset your password.</p>

                <ForgotPasswordForm />
            </article>
        </section>
    );
};

export default ForgotPassword;