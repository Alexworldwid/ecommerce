import ForgotPasswordForm from '@/app/component/forms/forgotPasswordForm';
import PageIndicator from '@/app/component/ui/pageIndicator';
import React from 'react';


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