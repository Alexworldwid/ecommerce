"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const schema = z.object({
  email: z.string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
  fullName: z.string()
    .nonempty({ message: "Full name is required" })
    .regex(/^[a-zA-Z]+(?: [a-zA-Z]+)+$/, { message: "Enter your first and last name" }),
});


type FormData = z.infer<typeof schema>;


export default function ProfileDetailForm() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchDetails = async () => {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        const { data: savedAddress, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();


        if (savedAddress && !error) {
            reset({
                email: user.email || '',
                fullName: savedAddress.full_name || '',
            });
        }
    };

    fetchDetails();
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
        const {data: detailData, error: detailError} = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            email: data.email,
            full_name: data.fullName,
        }, {onConflict: 'id'})
        .select()
        .single();

        if (detailError) throw detailError;
        console.log("Address upserted:", detailData);
        console.log(loading)

    } catch (error) {
        console.error("Error submitting shipping address form:", error);
    } finally{
        setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3 py-12 flex flex-col ">
        <div className='flex flex-col w-full gap-2'>
            <div className='flex flex-col w-full md:w-1/2 gap-2'>
                <label  className='text-zinc-600 text-sm font-medium font-inter leading-normal' htmlFor="email">Email</label>
                <input
                    type="email"
                    {...register('email')}
                    id='email'
                    readOnly
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

        <button 
            type="submit"
            disabled={loading}
            className="bg-black text-white rounded-md py-2 px-4 disabled:opacity-50 w-fit"
            >
            {loading ? 'Saving...' : 'Save details'}
        </button>
    </form>
  );
}