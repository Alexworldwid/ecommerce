import UpdatePasswordForm from '@/app/component/forms/updatePasswordForm';
import PageIndicator from '@/app/component/ui/pageIndicator';
import { createClient } from '@/utils/supabase/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';


export const metadata: Metadata = {
  title: 'Update password',
  description: 'Welcome to Eccomerce Update password page',
  openGraph: {
    title: 'Eccomerce Update Password',
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
    title: 'Eccomerce Update Password',
    description: 'Eccomerce - your one stop shop for amenities',
    images: ['https://ecommerce-git-main-adewales-projects-b629bcea.vercel.app/images/ecommerce-profile.png'], // Must be an absolute URL
  },
}



const UpdatePassword = async () => {
    const supabase = await createClient();
    const {data: { user}} = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }


    return (
        <section className='pt-[130px] w-full flex flex-col items-center gap-14'>
            <article className='w-full flex flex-col items-center bg-neutral-100 py-10'>
                <div className='w-full max-w-[1113px] flex flex-col px-3 gap-1'>
                    <h2 className='font-semibold text-2xl font-inter'>Reset Password</h2>
                    <PageIndicator pageTitle='Reset Password' />
                </div>
            </article>

            <article className='w-full max-w-[520px] flex flex-col items-center px-3 gap-4'>
                <UpdatePasswordForm />
            </article>
        </section>
    );
};

export default UpdatePassword;