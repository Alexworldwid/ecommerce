"use client";

import React, { useEffect, useRef } from 'react';
import { useMenu } from '@/app/context/menuContext';
import gsap from 'gsap';
import Link from 'next/link';
import SearchBar from './searchBar';

const MobileMenu = () => {
    const { isMenuOpen } = useMenu();
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.3, ease: "power2.inOut" } });

        if (isMenuOpen) {
            tl.to(menuRef.current, { left: "0%" });
        } else {
            tl.to(menuRef.current, { left: "102%" });
        }
    }, [isMenuOpen]);

    return (
        <div
            ref={menuRef}
            className="backdrop-blur-md bg-gray-200/30 fixed bottom-0 top-[57.98px] right-0 h-screen w-full pt-[80px] px-4 lg:hidden gap-8 flex flex-col"
            style={{ left: '102%' }} // Initial position off-screen
        >
            {/* search bar */}
            <SearchBar />

            {/* links */}
            <ul className='flex flex-col justify-start items-center gap-8'>
                <li>
                    <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>Home</Link>
                </li>
                <li className='flex items-center justify-center gap-2 group'>
                    <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal group-hover:text-gray-900 transition-all duration-200 ease-in'>Categories</Link>
                </li>
                <li>
                    <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>About</Link>
                </li>
                <li>
                    <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>Contact</Link>
                </li>
            </ul>

            <div className='flex justify-center items-center gap-8 md:hidden'>
                
                {/* cart icon */}
                <Link href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" className='fill-gray-600 hover:fill-gray-900 transition-all ease-in duration-150 cursor-pointer'>
                        <path d="M230.14,58.87A8,8,0,0,0,224,56H62.68L56.6,22.57A8,8,0,0,0,48.73,16H24a8,8,0,0,0,0,16h18L67.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,160,204a28,28,0,1,0,28-28H91.17a8,8,0,0,1-7.87-6.57L80.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,230.14,58.87ZM104,204a12,12,0,1,1-12-12A12,12,0,0,1,104,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,200,204Zm4-74.57A8,8,0,0,1,196.1,136H77.22L65.59,72H214.41Z"></path>
                    </svg>
                </Link>

                {/* profile icon */}
                <Link href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256" className='fill-gray-600 hover:fill-gray-900 transition-all duration-200 ease-in cursor-pointer'>
                        <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default MobileMenu;
