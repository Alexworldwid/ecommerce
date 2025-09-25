"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import React from 'react';
import { toast } from 'react-hot-toast';

// Validation schema
const schema = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
});

type FormData = z.infer<typeof schema>;


const SubscribeForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
            resolver: zodResolver(schema),
    });

    // This is just a placeholder until Firebase is connected
    const onSubmit = async (data: FormData) => {
        // optional: wrap in toast.promise if you’ll do real async work later
        toast.promise(
            fakeSave(data.email), // placeholder
            {
            loading: "Saving…",
            success: "🎉 You’re on the list!",
            error: "Something went wrong",
            }
        );
        reset();
    };

    // fake async until Firebase arrives
    const fakeSave = (email: string) => {
        new Promise((res) => setTimeout(res, 2000));
        return new Promise((resolve) => {
            console.log(`Email saved: ${email}`); // Simulate saving to Firebase
            resolve(true);
        });
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/2 flex flex-col gap-2">
            <div className='flex gap-2 flex-col md:flex-row'>
                <input
                    type="email"
                    placeholder="your email address"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email")}
                    className={`w-full md:w-[70%] focus:outline-none rounded-md border px-4 py-2 ${errors.email ? "border-red-500" : ""} ${errors.email ? "focus:border-red-500" : "focus:border-green-500"}`}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-[30%] rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
                >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
                
            </div>

            {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
            )}

            
        </form>
    );
};

export default SubscribeForm;