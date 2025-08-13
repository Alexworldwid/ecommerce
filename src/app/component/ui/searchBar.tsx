'use client';

import { useSearch } from "@/app/context/searchContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchTerms } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleFocus = () => {
    if (pathname !== '/search') {
      router.push('/search');
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchTerms(inputValue);
    }, 500); // debounce delay

    return () => clearTimeout(delay);
  }, [inputValue, setSearchTerms]);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 256 256"
        className="fill-gray-600 absolute left-3 top-1/2 -translate-y-1/2"
      >
        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
      </svg>
      <input
        type="search"
        placeholder="Search products…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={handleFocus}
        className="w-full max-w-md rounded-md border pl-8 pr-4 py-2 focus:outline-none focus:border-green-600"
      />
    </div>
  );
}
