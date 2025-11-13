"use client";

import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useActionState } from "react";
import { login } from "@/app/action";
import Link from "next/link";
import toast from "react-hot-toast";


// ✅ schema
const schema = z.object({
  email: z.string().nonempty("Email is required").email("Enter a valid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must not exceed 64 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
});

type FormValues = z.infer<typeof schema>;

export default function ClientFormLogin() {
  const formRef = useRef<HTMLFormElement>(null);

  const [loginState, loginAction] = useActionState(login, { error: null });
  const [isPending, startTransition] = useTransition();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // ✅ react to loginState updates
  useEffect(() => {
    if (loginState.error) {
      toast.error(loginState.error);
    }
  }, [loginState]);



  // ✅ handleSubmit gives us validated values
  const onValid = (data: FormValues) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    // call server action via startTransition
    startTransition(async () => {
      await loginAction(formData);
      if ( !loginState.error) {
        reset();
      }
    });


  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => e.preventDefault()} // prevent auto submit
      className="w-full space-y-3 pb-10 flex flex-col gap-3"
    >
      <div>
        <label
          htmlFor="email"
          className={`${errors.email ? "text-red-500" : "text-zinc-600"}  text-sm font-medium font-inter leading-normal`}
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className={`w-full rounded-md outline-none border px-4 py-2 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className={`${errors.password ? "text-red-500" : "text-zinc-600"} text-sm font-medium font-inter leading-normal`}
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className={`w-full outline-none rounded-md border px-4 py-2 ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="w-full flex justify-end text-sm font-medium font-inter leading-normal text-zinc-600 underline">
        <Link href="/forgotPassword">forgot password?</Link>
      </div>

      <button
        type="button"
        disabled={isPending}
        onClick={handleSubmit(onValid)}
        className={`${isPending ? "bg-black/75": "bg-black"} hover:bg-black/75 w-full rounded-md px-4 py-2 text-white disabled:opacity-50`}
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="justify-start text-center text-gray-600 text-sm font-normal font-inter leading-normal">Don&apos;t have an account? <Link href="/signUp">sign up</Link> </p>
    </form>
  );
}
