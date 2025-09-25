import ClientFormLogin from '@/app/component/forms/clientFormLogin';
import SignInWithGoogle from '@/app/component/forms/signInWithGoogle';
import PageIndicator from '@/app/component/ui/pageIndicator';
import React from 'react';





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