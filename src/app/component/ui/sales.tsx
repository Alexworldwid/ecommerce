"use client";

import React, { useState } from 'react';
import FeaturedCatalogue from './featuredCatalogue';
import LatestCatalogue from './latestCatalogue';


const Sales = () => {
    const [featured, setFeatured] = useState<boolean>(true);
    const [latest, setLatest] = useState<boolean>(false);

    const toggleFeatured = () => {
        setFeatured(true);
        setLatest(false);
    };

    const toggleLatest = () => {
        setFeatured(false);
        setLatest(true);
    }

    return (
        <section className='flex w-full items-center justify-center py-8'>
            <article className='w-full max-w-[1116px] px-3'>
                <div className='flex items-center justify-center'>
                    <button onClick={toggleFeatured} className={`${featured ? "text-gray-800 outline outline-1 outline-offset-[-1px] outline-gray-200" : "text-gray-600 outline-none"} px-4 py-[3px] rounded-[100px]  inline-flex justify-start items-start gap-2.5  text-sm font-medium font-inter leading-normal`}>Featured</button>
                    <button onClick={toggleLatest} className={`${latest ? "text-gray-800 outline outline-1 outline-offset-[-1px] outline-gray-200" : "text-gray-600 outline-none"} text-sm font-normal font-inter leading-normal px-4 py-[3px] rounded-[100px]  inline-flex justify-start items-start gap-2.5`}>Latest</button>
                </div>
                
                {
                    featured && <FeaturedCatalogue />
                }
                {
                    latest && <LatestCatalogue />
                }
            </article>
        </section>
    );
};

export default Sales;