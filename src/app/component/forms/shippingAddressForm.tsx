"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  fullName: z.string()
    .nonempty({ message: "Full name is required" })
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/, { message: "Enter your first and last name" }),
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

interface ShippingAddressFormProps {
    formRef: React.RefObject<HTMLFormElement | null>
}

export default function ShippingAddressForm({formRef}: ShippingAddressFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log('✅ Valid input:', data); 
    reset();
  };


  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
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
                    type="number"
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

        <div className='flex flex-col md:flex-row w-full gap-2'>
            <div className='flex flex-col w-full md:w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="email">Email</label>
                <input
                    type="email"
                    {...register('email')}
                    id='email'
                    className={`w-full rounded-md border px-4 py-2 border-neutral-300 focus:outline-neutral-600 ${errors.email ? 'border-red-500' : ''}`} 
                />
                    
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        
            </div>

            <div className='flex flex-col w-full md:w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="fullname">Full name</label>
                <input 
                    type="text" 
                    {...register('fullName')}
                    id='fullname'
                    className={`w-full rounded-md border border-neutral-300 px-4 py-2 focus:outline-neutral-600 ${errors.fullName ? 'border-red-500' : ''}`}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>
        </div>

      
    </form>
  );
}