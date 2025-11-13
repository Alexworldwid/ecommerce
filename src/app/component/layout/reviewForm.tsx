'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StarRatingInput from '../ui/starRatingInput';
import { createClient } from '@/utils/supabase/client';



const schema = z.object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    reviews: z.string().min(1, { message: 'Review cannot be empty' }),
    rating: z.number().min(1, { message: 'Select a rating' }).max(5),
  });
  

type FormData = z.infer<typeof schema>;

interface ReviewFormProps {
    onNewReview?: (review: Review) => void;
    stopWritingReview?: () => void;
    productId: string;
};

interface Review {
  reviewId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewForm({onNewReview, stopWritingReview, productId}: ReviewFormProps) {
  const supabase = createClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: 0,
    },
  });

  const rating = watch('rating');

  const onSubmit = async (data: FormData) => {
    const currentDate = new Date().toISOString();

    const newReview = {
      reviewId: `rev-${Date.now()}`,
      reviewerName: `${data.firstName} ${data.lastName}`,
      rating: data.rating,
      date: currentDate,
      comment: data.reviews,
    };

    try {
      const {data, error:fetchError} = await supabase
        .from('products')
        .select('reviews')
        .eq('id', productId)
        .single();

      if (fetchError) throw fetchError;

      const currentReviews = data?.reviews || [];

      // ✅ Push the new review
      const updatedReviews = [...currentReviews, newReview];

      // ✅ Update the row
      const { error: updateError } = await supabase
        .from("products")
        .update({ reviews: updatedReviews })
        .eq("id", productId);

      if (updateError) throw updateError;

      if (!updateError) {
        onNewReview?.(newReview); // update parent UI
        alert("Review added successfully!");
        stopWritingReview?.();
        reset();
      }

      alert("Review added successfully!");
    } catch (error) {
      console.error("Error adding review:", error);
    }


    
  };

  return (
    <div className='flex flex-col gap-4 py-4'>
        <div className='flex justify-between'>
            <p>Write Review</p>
            <button onClick={stopWritingReview}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>
            </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3 flex flex-col gap-4">
            <input
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className={`w-full outline-none focus:${errors.email ? "" : "outline-green-500"} rounded-md border px-4 py-2 ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}

            <input
                type="text"
                placeholder="First Name"
                {...register('firstName')}
                className={`w-full outline-none focus:${errors.firstName ? "" : "outline-green-500"} rounded-md border px-4 py-2 ${errors.firstName ? 'border-red-500' : ''}`}
                />
            {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}

            <input
            type="text"
            placeholder="Last Name"
            {...register('lastName')}
            className={`w-full outline-none focus:${errors.lastName ? "" : "outline-green-500"} rounded-md border px-4 py-2 ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}

            <textarea
                placeholder="Write your review"
                {...register('reviews')}
                rows={10}
                className={`w-full outline-none focus:${errors.reviews ? "" : "outline-green-500"} rounded-md border px-4 py-2 ${errors.reviews ? 'border-red-500' : ''}`}
            />
            {errors.reviews && <p className="text-sm text-red-500">{errors.reviews.message}</p>}

            <div>
                <StarRatingInput rating={rating} onChange={(r) => setValue('rating', r)} />
                {errors.rating && <p className="text-sm text-red-500">{errors.rating.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white py-2 rounded-md"
            >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
        </form>
    </div>
  );
}
