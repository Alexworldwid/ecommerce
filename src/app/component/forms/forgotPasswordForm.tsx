"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { resetPassword } from '@/app/action';
import { useTransition, useActionState, useRef } from 'react';
import toast from 'react-hot-toast';


const schema = z.object({
    email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),
});


type FormValues = z.infer<typeof schema>;

const ForgotPasswordForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    
    const [forgotPasswordState, forgotPasswordAction] = useActionState(resetPassword, { error: null, message: null });
    const [isPending, startTransition] = useTransition();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (forgotPasswordState.error) {
          toast.error(forgotPasswordState.error);
        } else if (forgotPasswordState.message) {
          toast.success(forgotPasswordState.message);
        }
      }, [forgotPasswordState]);

    // ✅ handleSubmit gives us validated values
    const onValid = (data: FormValues) => {
        const formData = new FormData();
        formData.append("email", data.email);

        // call server action via startTransition
        startTransition(async () => {
            await forgotPasswordAction(formData);
            if (!forgotPasswordState.error) reset();
        });
    };
    
    return (
        <form 
        ref={formRef}
        onSubmit={(e) => e.preventDefault()}  className="w-full space-y-3 py-10 flex flex-col gap-3">
            <div>
                <label htmlFor="email" className='text-zinc-600 text-sm font-medium font-inter leading-normal'>Email</label>
                <input
                    id='email'
                    type="email"
                    {...register('email')}
                    className={`w-full rounded-md outline-none border px-4 py-2 ${errors.email ? 'border-red-500' : ''}`} />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(onValid)}
                className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">
                {isPending ? 'sending reset link' : 'Send reset link'}
            </button>

        </form>
    );
};

export default ForgotPasswordForm;