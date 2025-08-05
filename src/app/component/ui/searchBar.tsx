// src/components/SearchBar.tsx
'use client';
import { useState } from 'react';

export default function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <div className={`relative`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" className='fill-gray-600 transition-all ease-in duration-200 absolute left-3 top-1/2 -translate-y-1/2'>
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
        <input
            type="search"
            placeholder="Search products…"
            value={value}
            onChange={e => setValue(e.target.value)}
            className={`w-full max-w-md  rounded-md border pl-8 pr-4 py-2 peer focus:outline-none focus:border-green-600`}
        />
    </div>
  );
}
