import React from 'react';

import { useProducts } from '@/app/context/productContext';
import type { Products } from '@/app/types/product';
import ProductCard from './productCard';


interface SimilarProductProps {
    product: Products;
}

const SimilarProduct = ({product}: SimilarProductProps) => {
    const { products } = useProducts();

    const SimilarProducts = products.filter((p) => p.id !== product.id );

    return (
        <div className='flex flex-col gap-6 w-full max-w-[1116px] px-4 py-16'>
            <div>
                <h2 className='text-gray-900 text-2xl font-bold font-inter'>You might also like</h2>
                <p className='text-gray-500 text-xs font-medium font-inter uppercase leading-normal tracking-wide'>SIMILAR PRODUCTS</p>
            </div>

            <div className='flex overflow-scroll scrollbar-hide gap-4 w-full'>
                {
                    SimilarProducts.map((item, index) => (
                        <div key={index}>
                            <ProductCard  product={item} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SimilarProduct;