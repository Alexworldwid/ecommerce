'use client';

import AppliedFilter from '@/app/component/layout/appliedFilter';
import PaginationInfo from '@/app/component/layout/paginationInfo';
import ProductCard from '@/app/component/layout/productCard';
import CurrentPageIndicator from '@/app/component/ui/currentPageIndicator';
import FilterPanel from '@/app/component/ui/filterPanel';
import PageIndicator from '@/app/component/ui/pageIndicator';
import { useProducts } from '@/app/context/productContext';
import { useSearch } from '@/app/context/searchContext';
import type { Products } from '@/app/types/product';
import SortProducts from '@/utils/sortProducts';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';





type SearchTerm = {
  category?: string[];
  priceRange?: [number, number];
  color?: string;
  size?: string;
  searchTerms?: string;
};

export default function ListingResult() {
    const { searchTerms } = useSearch();
    const { products, loading } = useProducts();

    const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
    const [category, setCategory] = useState<string[]>(["bags"]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
    const [color, setColor] = useState<string>('');
    const [size, setSize] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [sortTypeString, setSortTypeString] = useState<string>('newest');
    const [sortMenuOpen, setSortMenuOpen] = useState<boolean>(false);
    const itemsPerPage = 9;

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
    



    const searchTerm = useMemo(() => ({
        category,
        priceRange,
        color,
        size,
        searchTerms
      }), [category, priceRange, color, size, searchTerms]);
      

    const filterProducts = (products: Products[], filters: SearchTerm): Products[] => {
      const searchTerm = filters.searchTerms?.trim().toLowerCase() || "";

      // Step 1 — filter by search first
      let results = products;
      if (searchTerm) {
        results = results.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
      }

      // Step 2 — apply other filters
      return results.filter((product) => {
        const matchCategory =
          !filters.category ||
          filters.category.some((cat) => (product.category ?? []).includes(cat));

        const matchPrice =
          !filters.priceRange ||
          (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

        const matchColor =
          !filters.color ||
          (product.color ?? []).some((c) => c.colorName === filters.color);

        const matchSize =
          !filters.size ||
          (product.size ?? []).some((p) => p.sizeValue === filters.size);

        return matchPrice && matchColor && matchSize && matchCategory;
      });
    };


  useEffect(() => {
    const timeout = setTimeout(() => {
      const results = filterProducts(products, searchTerm);
      setFilteredProducts(results);
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [searchTerm, products]);

  const sorted = useMemo(() => {
    return SortProducts({ products: filteredProducts, sortType: sortTypeString });
  }, [filteredProducts, sortTypeString]);

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, filteredProducts.length);
  const paginatedProducts = sorted.slice(start - 1, end);


  


  return (
    <section className='pt-40 flex flex-col gap-4 w-full max-w-[1116px] px-4'>
        <PageIndicator pageTitle='search'/>
        <div className='flex flex-row gap-8 w-full relative'>
            <FilterPanel category={category} setColor={setColor} setSize={setSize} setPriceRange={setPriceRange} priceRange={priceRange} setCategory={setCategory} color={color} size={size} isFilterMenuOpen={isFilterMenuOpen} />
            <article className='w-full flex flex-col'>
              {
                sorted.length > 0 && <AppliedFilter color={color} category={category} size={size} setIsFilterMenuOpen={setIsFilterMenuOpen} isFilterMenuOpen={isFilterMenuOpen} />
              }
                {
                  sorted.length > 0 && <PaginationInfo
                                            start={start}
                                            end={end}
                                            totalItems={filteredProducts.length}
                                            setSortTypeString={setSortTypeString}
                                            sortMenuOpen={sortMenuOpen}
                                            setSortMenuOpen={setSortMenuOpen}
                                            sortType={sortTypeString}
                                        />
                }
                {   
                    loading ? (
                        <p>
                          loading...
                        </p>
                    ) : sorted && sorted.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {paginatedProducts.map((product) => (
                                  <div className='md:max-w-[320px]' key={product.id}>
                                    <ProductCard product={product} />
                                  </div>
                              ))}
                          </div>
                        
                    ) : (
                        <>
                          <div className='relative w-full h-[350px] lg:h-[400px] rounded-md'>
                            <Image src="/images/Allura - Error Found.png" alt='Allura - Error Found' fill className='rounded-md object-contain' />
                          </div>
                          <p className='text-inter font-medium leading-normal text-center mt-4'>Product Not found</p>
                        </>
                    )
                }
                <CurrentPageIndicator currentPage={currentPage} setCurrentPage={setCurrentPage} totalItems={filteredProducts.length} />
            </article>
        </div>
    </section>
  );
}
