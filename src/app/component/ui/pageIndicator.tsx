"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

type PageIndicatorProps = {
    pageTitle: string;
}

const PageIndicator = ({pageTitle}: PageIndicatorProps) => {
    const router = useRouter();

    return (
        <div className='flex gap-1 justify-start items-center'>
            <button className='text-gray-600 text-sm font-medium font-inter leading-normal' onClick={() => router.back()}>Ecommerce</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" className='fill-zinc-500' viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
            <p className='justify-start text-gray-900 text-sm font-medium font-inter leading-normal'>{pageTitle}</p>
        </div>
    );
};

export default PageIndicator;