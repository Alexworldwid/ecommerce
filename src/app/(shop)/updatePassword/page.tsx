import UpdatePasswordForm from '@/app/component/forms/updatePasswordForm';
import PageIndicator from '@/app/component/ui/pageIndicator';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react';



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