import React from 'react';
import type { Products } from '@/app/types/product';

interface ProductDetailsProps {
    product: Products;
}

const ProductDetails = ({product}: ProductDetailsProps ) => {
    const {details} = product;

    return (
        <div className='flex flex-col gap-6 w-full '>
            <h2 className='justify-start text-gray-900 text-base font-semibold font-inter'>Details</h2>

            <div>
                <p>{details.detailsBody1}</p>
                <p>{details.detailsBody2}</p>
            </div>

            <ul>
                {
                    details.features.map((feature, index) => (
                        <li key={index} className="text-gray-900 text-sm font-normal font-inter leading-normal list-disc list-inside">
                            {feature}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductDetails;