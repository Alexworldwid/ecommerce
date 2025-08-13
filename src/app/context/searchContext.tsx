"use client"
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext<{
  searchTerms: string;
  setSearchTerms: (val: string) => void;
}>({ searchTerms: '', setSearchTerms: () => {} });

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerms, setSearchTerms] = useState('');

  console.log('Search Term:', searchTerms);

  return (
    <SearchContext.Provider value={{ searchTerms, setSearchTerms }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
