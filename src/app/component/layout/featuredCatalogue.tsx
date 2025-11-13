"use client";

import React from 'react';
import ProductCard from './productCard';
import type { Products } from '@/app/types/product';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


const FeaturedCatalogue = () => {
    const { items, loading } = useSelector((state: RootState) => state.products)

    // Early return if products are not loaded yet
    if (!items || items.length === 0) return null;
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }
    const featured = items
        .filter(product => product.tags?.includes('featured'));


    return (
        <div className=" w-full max-w-[1116px] inline-flex justify-between items-center overflow-scroll py-2 scrollbar-hide">
            {featured.map((product: Products) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default FeaturedCatalogue;