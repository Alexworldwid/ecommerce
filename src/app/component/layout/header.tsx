import React from 'react';

const Header = () => {
    return (
        <header className="bg-gray-900 text-white py-2 md:p-4 flex items-center justify-center fixed top-0 left-0 w-full z-50">
            <div className='w-full max-w-[1116px] md:h-6 flex flex-col md:flex-row items-center justify-center md:gap-2'>
                <p className='text-white text-sm font-normal font-inter leading-normal'>Get 25% OFF on your first order.</p>
                <p className='text-white text-sm font-medium font-inter leading-normal'>Order Now</p>
            </div>
        </header>
    );
};

export default Header;