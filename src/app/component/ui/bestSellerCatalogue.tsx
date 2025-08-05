"use client";

import { useProducts } from '@/app/context/productContext';
import React from 'react';
import ProductCard from './productCard';
import type { Products } from '@/app/types/product';

const BestSellerCatalogue = () => {
    const { products, loading } = useProducts();

    // Early return if products are not loaded yet
    if (!products || products.length === 0) return null;
    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }
    const bestSellers = products.filter(product => product.tags?.includes('best seller'));

    return (
        <div className=" w-full max-w-[1116px] inline-flex justify-between items-center overflow-y-scroll py-2 scrollbar-hide">
            {bestSellers.map((product: Products) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default BestSellerCatalogue;