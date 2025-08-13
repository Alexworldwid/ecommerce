"use client";

import React, { useState } from 'react';
import type { Products } from '@/app/types/product';
import StarRatingDisplay from './starRatingDisplay';
import { formatDistanceToNow } from 'date-fns';
import SortBy from '../ui/sortBy';
import ReviewForm from './reviewForm';



interface ProductReviewProps {
    product: Products;
}

const ProductReview = ({ product }: ProductReviewProps) => {
    const { reviews } = product;       
    const [writingReviews, setWritingReviews] = useState(false);


    const totalReviews = product.reviews?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const averageRating = totalReviews / (product.reviews?.length || 1);
    const roundedRating = Math.round(averageRating * 10) / 10;

    //sort and paginate
    const [sortMenuOpen, setSortMenuOpen] = useState(false);
    const [sortType, setSortType] = useState("newest");


    const sortedReviews = [...(reviews) ?? []].sort((a, b) => {
        if (sortType === "newest") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortType === "oldest") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortType === "highest") {
            return b.rating - a.rating;
        } else if (sortType === "lowest") {
            return a.rating - b.rating;
        } else {
            return 0; // Default case, no sorting
        }
    });
      
    const [visibleReviews, setVisibleReviews] = React.useState(3);
    const reviewsToShow = sortedReviews?.slice(0, visibleReviews);
    const loadMoreReviews = () => {
        setVisibleReviews(prev => prev + 3);
    };

    const toggleSortMenu = () => {
        setSortMenuOpen(!sortMenuOpen);
    }

    const writeReviews = () => {
        setWritingReviews(true);
    }

    const stopWritingReview = () => {
        setWritingReviews(false);
        setSortMenuOpen(false);
    }




    return (
        <div className='flex flex-col gap-6'>
          {writingReviews ? (
            <ReviewForm reviews={reviews} stopWritingReview={stopWritingReview} />
          ) : (
            <>
              <div className='flex gap-4 flex-col border-b border-b-gray-500 py-4'>
                <div>
                  <h2 className='justify-start text-gray-900 text-base font-semibold font-inter'>
                    Reviews
                  </h2>
                  <p className='justify-start text-gray-900 text-3xl font-bold font-inter'>
                    {roundedRating}
                  </p>
                </div>
      
                <button
                  onClick={writeReviews}
                  className='inline-flex px-6 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-900 w-fit justify-start items-center gap-1.5 overflow-hidden text-gray-900 text-sm font-medium font-inter leading-normal'
                >
                  Write a review
                </button>
      
                <div className='relative'>
                  <p className='flex items-center justify-end gap-2'>
                    <span className='cursor-pointer' onClick={toggleSortMenu}>
                      SORT BY
                    </span>
                    <svg
                      className={`${
                        sortMenuOpen ? '-rotate-180' : ''
                      } transition-all duration-150 ease-in cursor-pointer`}
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      fill='#000000'
                      viewBox='0 0 256 256'
                    >
                      <path d='M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z'></path>
                    </svg>
                  </p>
      
                  {sortMenuOpen && <SortBy setSortType={setSortType} sortType={sortType} />}
                </div>
              </div>
      
              {reviewsToShow?.map((review, index) => (
                <div className='flex gap-4' key={index}>
                  <div className='w-12 h-12 px-1.5 py-0.5 bg-indigo-50 rounded-[100px] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden'>
                    <p className='text-center justify-start text-blue-500 text-sm font-normal font-inter leading-normal'>
                      {review.reviewerName
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </p>
                  </div>
                  <div className='flex flex-1 flex-col'>
                    <p>{review.reviewerName}</p>
                    <p>{formatDistanceToNow(new Date(review.date), { addSuffix: true })}</p>
                    <p>{review.comment}</p>
                  </div>
                  <div>
                    <StarRatingDisplay rating={review.rating} />
                  </div>
                </div>
              ))}
      
              {reviews && reviews.length > visibleReviews && (
                <div className='flex items-center justify-center'>
                  <button
                    onClick={loadMoreReviews}
                    className='w-fit justify-start text-gray-600 text-sm font-medium font-inter leading-normal px-6 py-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-400 inline-flex items-center gap-1.5 overflow-hidden'
                  >
                    Load more reviews
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      );
      
};

export default ProductReview;