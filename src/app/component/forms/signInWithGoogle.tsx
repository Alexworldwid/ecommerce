import { signInWithGoogleAction } from '@/app/action';
import Image from 'next/image';
import React from 'react';

const SignInWithGoogle = () => {
    return (
        <form className='rounded outline outline-1 outline-offset-[-1px] outline-gray-400 inline-flex justify-center items-center gap-2 w-full px-6 py-3 hover:bg-gray-400 transition-all duration-150 ease-in'>
            <button
                type='submit'
                formAction={signInWithGoogleAction}
                className='flex items-center justify-center gap-2 w-full '
            >
                <span className='relative w-4 h-4 block'>
                    <Image src="/images/Google.png" fill alt='google icon' />
                </span>

                sign in with google
            </button>
        </form>
    );
};

export default SignInWithGoogle;