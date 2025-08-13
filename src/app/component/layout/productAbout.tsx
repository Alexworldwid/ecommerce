"use client";

import React, { useState } from 'react';
import ProductDetails from '@/app/component/layout/productDetails';
import type { Products } from '@/app/types/product';
import ProductReview from './productReview';



interface ProductAboutProps {
    product: Products;
}

const ProductAbout = ({product}: ProductAboutProps) => {
    const [detailstate, setDetailState] = useState<boolean>(true);
    const [reviewState, setReviewState] = useState<boolean>(false);

    const handleDetailSwitch = () => {
        setDetailState(true);
        setReviewState(false);
    }

    const handleReviewSwutch = () => {
        setDetailState(false);
        setReviewState(true);
    }

    return (
        <article className='flex w-full max-w-[1116px] px-4 gap-12 flex-col md:flex-row'>
          <div className='flex flex-row md:flex-col w-full md:max-w-[240px] pt-[40px] gap-4'>
            <button onClick={handleDetailSwitch} className={`w-1/2 md:w-full  flex items-center gap-2 text-gray-600 transition-all duration-200 p-2  rounded-md ${detailstate ? "bg-gray-100" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z"></path></svg>
              <p>Details</p>
            </button>
            <button onClick={handleReviewSwutch} className={`w-1/2 md:w-full flex items-center gap-2 text-gray-600 transition-all duration-200 p-2  rounded-md ${reviewState ? "bg-gray-100" : ""}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
              <p>Reviews</p>
            </button>
          </div>
          <div className='w-full'>
            {
                detailstate && <ProductDetails product={product} />
            }

            {
                reviewState && <ProductReview product={product} />
            }
          </div>
        </article>
    );
};

export default ProductAbout;