"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const schema = z.object({
  shippingAddress: z.object({
    street: z.string()
      .nonempty({ message: "Street address is required" })
      .min(5, { message: "Street address is too short" })
      .regex(/^[\w\s.,'-]+$/, { message: "Enter a valid street address" }),
    city: z.string()
      .nonempty({ message: "City is required" })
      .min(2, { message: "City is too short" })
      .regex(/^[a-zA-Z\s]+$/, { message: "City should only contain letters" }),
    state: z.string()
      .nonempty({ message: "State is required" })
      .min(2, { message: "State is too short" })
      .regex(/^[a-zA-Z\s]+$/, { message: "State should only contain letters" }),
    zipCode: z.string()
      .nonempty({ message: "Zip code is required" })
      .regex(/^\d{5}(-\d{4})?$/, { message: "Enter a valid zip code (e.g. 12345 or 12345-6789)" }),
    country: z.string()
      .nonempty({ message: "Country is required" })
      .min(2, { message: "Country is too short" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Country should only contain letters"}),
  }),
});


type FormData = z.infer<typeof schema>;


export default function ProfileAddressForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchAddress = async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const { data: savedAddress, error } = await supabase
        .from('addresses')
        .select('*')
        .eq('user_id', user.id)
        .single();


        if (savedAddress && !error) {
            reset({
                shippingAddress: {
                street: savedAddress.street_address || '',
                city: savedAddress.city || '',
                state: savedAddress.state || '',
                zipCode: savedAddress.zip_code || '',
                country: savedAddress.country || ''
                }
            });
        }
    };

    fetchAddress();
    }, [reset]);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
        const supabase = await createClient();
        const {data: {user}} = await supabase.auth.getUser();

        if (!user) {
            console.log("No user logged in.");
            return;
        }

        // update the address in the database 
        const {data: addressData, error: addressError} = await supabase
        .from('addresses')
        .upsert({
            user_id: user.id,
            street_address: data.shippingAddress.street,
            city: data.shippingAddress.city,
            state: data.shippingAddress.state,
            zip_code: data.shippingAddress.zipCode,
            country: data.shippingAddress.country,
        }, {onConflict: 'user_id'})
        .select()
        .single();

        if (addressError) throw addressError;
        console.log("Address upserted:", addressData);
        console.log(loading)

    } catch (error) {
        console.error("Error submitting shipping address form:", error);
    } finally{
        setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full py-8 space-y-3 flex flex-col gap-2">
        <div className='flex flex-col w-full gap-2'>
            <label className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="shippingAddress">Shipping Address</label>
            <input 
                type="text" 
                {...register('shippingAddress.street')}
                id='shippingAddress'
                className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.shippingAddress?.street ? 'border-red-500' : ''}`}
            />
            {errors.shippingAddress?.street && (
                <p className="text-sm text-red-500">{errors.shippingAddress.street.message}</p>
            )}
        </div>

        <div className='flex flex-row w-full gap-2'>
            <div className='flex flex-col w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="city">City</label>
                <input 
                    type="text" 
                    {...register('shippingAddress.city')}
                    id='city'
                    className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.shippingAddress?.city ? 'border-red-500' : ''}`}
                />
                {
                    errors.shippingAddress?.city && (
                        <p className="text-sm text-red-500">{errors.shippingAddress.city.message}</p>
                    )
                }
            </div>

            <div className='flex flex-col w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="state">State</label>
                <input 
                    type="text" 
                    {...register('shippingAddress.state')}
                    id='state'
                    className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.shippingAddress?.state ? 'border-red-500' : ''}`}
                />
                {
                    errors.shippingAddress?.state && (
                        <p className="text-sm text-red-500">{errors.shippingAddress.state.message}</p>
                    )
                }
            </div>
        </div>
        <div className='flex flex-row w-full gap-2'>
            <div className='flex flex-col w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="zipcode">Zip Code</label>
                <input 
                    type="text"
                    {...register('shippingAddress.zipCode')}
                    id='zipcode' 
                    className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.shippingAddress?.zipCode ? 'border-red-500' : ''}`}
                />
                {
                    errors.shippingAddress?.zipCode && (
                        <p className="text-sm text-red-500">{errors.shippingAddress.zipCode.message}</p>
                    )
                }
            </div>

            <div className='flex flex-col w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="country">Country</label>
                <input 
                    type="text"
                    {...register('shippingAddress.country')}
                    id='country' 
                    className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.shippingAddress?.country ? 'border-red-500' : ''}`}
                />
                {
                    errors.shippingAddress?.country && (
                        <p className="text-sm text-red-500">{errors.shippingAddress.country.message}</p>
                    )
                }
            </div>
        </div>

        <button 
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-md py-2 px-4 disabled:opacity-50 w-fit"
            >
            {loading ? 'Saving...' : 'Save Address'}
        </button>
    </form>
  );
}