"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUp } from '@/app/action';
import { useTransition, useActionState, useRef, useEffect } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';






const schema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Enter a valid email address" }),

  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(64, { message: "Password must not exceed 64 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" }),
});

type FormValues = z.infer<typeof schema>;

export default function ClientFormSignup() {
  const formRef = useRef<HTMLFormElement>(null);

  const [signUpState, signUpAction] = useActionState(signUp, { error: null, message: null });
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (signUpState.error) {
      toast.error(signUpState.error);
    } else if (signUpState.message) {
      toast.success(signUpState.message);
    }
  }, [signUpState]);

  // ✅ handleSubmit gives us validated values
  const onValid = (data: FormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    // call server action via startTransition
    startTransition(async () => {
      await signUpAction(formData);
      if (!signUpState.error) reset();
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

        <div>
            <label htmlFor="password" className='text-zinc-600 text-sm font-medium font-inter leading-normal'>Password</label>
             <input
                type="password"
                {...register('password')}
                 className={`w-full outline-none rounded-md border px-4 py-2 ${errors.password ? 'border-red-500' : ''}`} />
            {errors.password && <p  className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <p className='justify-start text-gray-600 text-xs font-medium font-inter capitalize leading-normal'>
          By creating an account you agree with our Terms of Service, Privacy Policy,
        </p>

        <button
            type="button"
            disabled={isPending}
            onClick={handleSubmit(onValid)}
            className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50">
            {isPending ? 'Signing Up ...' : 'Sign up'}
        </button>

        <p className='text-center text-gray-600 text-sm font-normal font-inter leading-normal'>Already have an account? <Link href="/login" className='underline'>Log in</Link> </p>
    </form>
  );
}