import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section id='hero' className='pt-[180px] pb-10 md:pb-none w-full bg-neutral-100 flex justify-center items-center'>
            <div className='max-w-[1116px] w-full px-3 flex  gap-4 md:gap-0 flex-col-reverse md:flex-row'>
                <article className='w-full md:w-1/2 md:h-[400px] flex justify-center flex-col gap-2 items-center md:items-start'>
                    <h1 className='text-gray-800 text-3xl font-semibold font-inter text-center md:text-start'>Fresh Arrivals Online</h1>
                    <p className='text-zinc-600 text-sm font-normal font-inter leading-normal'>Discover Our Newest Collection Today.</p>
                    <Link href="" className='px-6 py-3 bg-gray-900 rounded inline-flex justify-start items-center gap-1.5 overflow-hidden max-w-[180px] md:mt-6 hover:bg-gray-900/55 transition-all duration-150 ease-in group'>
                        <span className='text-white text-sm font-medium font-inter leading-normal'>View Collection</span>
                        <span className='group-hover:translate-x-1 transition-all duration-150 ease-in'>
                            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.2896 5.49578C13.5701 5.77425 13.5701 6.22575 13.2896 6.50422L7.75414 12L6.73841 10.9916L11.766 6L6.73841 1.00845L7.75414 0L13.2896 5.49578Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.9972 6.71308H0.5V5.28692H12.9972V6.71308Z" fill="white"/>
                            </svg>
                        </span>
                    </Link>
                </article>
                <article className='w-full md:w-1/2 md:relative h-[382px] md:h-auto relative flex md:block items-center justify-center'>
                    <div className='absolute md:right-[300px] top-16 right-[90%]'>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M38 18.9689C30.5464 19.6339 26.2639 20.2457 23.6348 22.2674C20.5449 24.6349 19.8131 28.9709 19 37.6429C18.1598 28.6517 17.4009 24.3423 14.0128 22.028C11.3837 20.2191 7.12839 19.6339 0 18.9955C7.42653 18.3304 11.7361 17.7186 14.3381 15.7235C17.4551 13.3294 18.1869 9.02002 19 0.321442C19.7589 8.32839 20.4365 12.6112 22.9572 15.0851C25.4779 17.559 29.8688 18.2506 38 18.9689Z" fill="#E6E7E8"/>
                        </svg>
                    </div>
                    <div className='absolute md:right-0 md:bottom-4 right[50%]'>
                        <div className="w-80 h-80 opacity-60 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className='relative md:absolute w-[255px] h-[382px] md:right-0 md:bottom-0'>
                        <Image src="/images/Hero Image.png" alt='' fill priority/>
                    </div>
                </article>
            </div>
        </section>
    );
};

export default Hero;