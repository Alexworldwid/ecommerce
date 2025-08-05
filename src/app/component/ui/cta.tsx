import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Cta = () => {
    return (
        <section className='bg-gradient-to-r from-neutral-100 to-white/0 rounded border-t border-b border-neutral-100 w-full flex items-center justify-center py-6 md:py-0'>
            <article className='w-full max-w-[1116px] flex px-3 justify-between flex-col-reverse md:flex-row'>
                <div className='flex flex-col justify-center gap-2 items-center md:items-start'>
                    <h2 className='text-gray-900 text-2xl font-bold font-inter text-center md:text-start'>Browse Our Fashion Paradise!</h2>
                    <p className='text-gray-600 text-sm font-normal font-inter leading-normal max-w-[462px] text-center md:text-start'>Step into a world of style and explore our diverse collection of clothing categories.</p>
                    <Link href="" className='px-6 py-3 bg-gray-900 rounded inline-flex justify-start items-center gap-1.5 overflow-hidden max-w-[180px] md:mt-6 hover:bg-gray-900/55 transition-all duration-150 ease-in group'>
                        <span className='text-white text-sm font-medium font-inter leading-normal'>Start Browsing</span>
                        <span className='group-hover:translate-x-1 transition-all duration-150 ease-in'>
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.2896 5.49578C13.5701 5.77425 13.5701 6.22575 13.2896 6.50422L7.75414 12L6.73841 10.9916L11.766 6L6.73841 1.00845L7.75414 0L13.2896 5.49578Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.9972 6.71308H0.5V5.28692H12.9972V6.71308Z" fill="white"/>
                            </svg>
                        </span>
                    </Link>
                </div>

                <div className='flex items-center justify-center md:block'>
                    <div className='relative w-[220px] h-[300px]'>
                        <Image src="/images/Category Image.png" alt='categories' fill />
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Cta;