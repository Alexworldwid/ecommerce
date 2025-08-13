"use client";

import Link from 'next/link';
import React from 'react';
import SearchBar from '../ui/searchBar';
import MenuButton from '../ui/menuButton';
import { useMenu } from '@/app/context/menuContext';
import MobileMenu from '../ui/mobileMenu';


const Nav = () => {
    const { isMenuOpen } = useMenu();

    return (
        <nav className={`${isMenuOpen ? "" : ""} bg-white z-40 h-20 w-full flex items-center justify-center fixed top-[57.98px] md:top-[53px] left-0 shadow-md transition-all duration-150 ease-in`}>
            <div className='w-full lg:max-w-[1116px] px-3 inline-flex justify-between items-center'>
                <div className='inline-flex justify-start items-center gap-24'>
                    {/* logo */}
                    <Link href="/" className='flex items-center gap-2 z-50'>
                        <div className='relative w-10 h-10 flex items-center justify-center rounded-full bg-black'>
                            <svg width="16" height="26" viewBox="0 0 16 26" fill="none" xmlns="http://www.w3.org/2000/svg" className=''>
                                <path d="M12.4769 4.34848L6.20402 0.555028C5.61195 0.192858 4.93884 0.00143753 4.25319 0.000244141C2.20945 0.000244141 0.334752 1.71219 0.334752 4.10496V18.3073L12.4769 10.9669C14.9083 9.49459 14.9083 5.8199 12.4769 4.34848ZM3.84837 11.4479V3.86787L10.1163 7.6566L3.84837 11.4479Z" fill="white"/>
                                <path d="M15.8489 25.9844C15.8489 26.0273 3.99081 25.966 3.99081 25.966L2.94336 25.8425C1.24672 25.644 -0.0557464 24.1232 0.00196809 22.3346C0.00196809 22.2917 0.00565199 22.2518 0.00810792 22.2102C0.0547076 21.4364 0.326076 20.6961 0.78582 20.0884C0.972526 19.8461 1.20091 19.6425 1.45916 19.4882L10.4782 14.0724C12.3414 12.9534 13.8931 12.562 14.6999 10.534C14.9974 9.77562 15.126 8.95611 15.0757 8.13784L15.0446 7.58649L15.9651 12.9204C16.083 13.8263 15.9013 14.7537 15.4211 15.5168C15.1326 15.9784 14.7475 16.3652 14.2951 16.6478L3.82954 21.8943C3.81908 21.9005 3.80897 21.9074 3.79925 21.9148C3.51273 22.1292 3.68955 22.6068 4.04034 22.5867L12.7515 22.6402C14.4433 22.5416 15.8526 24.2111 15.8489 25.9844Z" fill="white"/>
                            </svg>
                        </div>
                        <p className='text-gray-900 text-xl font-extrabold font-manrope capitalize'>Ecommerce</p>
                    </Link>

                    {/* links */}
                    <ul className='hidden lg:inline-flex justify-start items-center gap-8'>
                        <li>
                            <Link href="/" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>Home</Link>
                        </li>
                        <li >
                            <Link href="/search" className='text-gray-600 align-middle text-sm font-medium font-inter leading-normal group-hover:text-gray-900 transition-all duration-200 ease-in'>Categories</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>About</Link>
                        </li>
                        <li>
                            <Link href="" className='text-gray-600 text-sm font-medium font-inter leading-normal hover:text-gray-900 transition-all duration-200 ease-in'>Contact</Link>
                        </li>
                    </ul>
                </div>

                <div className='hidden md:inline-flex justify-end items-center gap-8 '>
                    {/* search bar */}
                    <SearchBar />

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

                <MenuButton />
            </div>     

            <MobileMenu />
        </nav>
    );
};

export default Nav;