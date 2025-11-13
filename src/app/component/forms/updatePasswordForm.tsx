"use client";

import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useActionState } from "react";
import { updatePassword } from "@/app/action";
import toast from "react-hot-toast";

const schema = z
.object({
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password must not exceed 64 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Must contain a special character"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // 👈 attach error to this field
});


type FormValues = z.infer<typeof schema>;


const UpdatePasswordForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const [updatePasswordState, updatePasswordAction] = useActionState(updatePassword, { error: null, message: null });
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (updatePasswordState.error) {
          toast.error(updatePasswordState.error);
        } else if (updatePasswordState.message) {
          toast.success(updatePasswordState.message);
        }
      }, [updatePasswordState]);

    // ✅ handleSubmit gives us validated values
    const onValid = (data: FormValues) => {
        const formData = new FormData();
        formData.append("password", data.password);

        // call server action via startTransition
        startTransition(async () => {
            await updatePasswordAction(formData);
            if (!updatePasswordState.error) reset();
        });
    };

    return (
        <form
            ref={formRef}
            onSubmit={(e) => e.preventDefault()} // prevent auto submit
            className="w-full space-y-3 pb-10 flex flex-col gap-3 py-8 max-w-[620px]"
            >

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

            <div>
                <label
                    htmlFor="confirmPassword"
                    className={`${errors.password ? "text-red-500" : "text-zinc-600"} text-sm font-medium font-inter leading-normal`}
                    >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className={`w-full outline-none rounded-md border px-4 py-2 ${
                        errors.password ? "border-red-500" : ""
                    }`}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            
            <button
                type="button"
                disabled={isPending}
                onClick={handleSubmit(onValid)}
                className={`${isPending ? "bg-black/75": "bg-black"} hover:bg-black/75 w-fit  rounded-md px-4 py-2 text-white disabled:opacity-50`}
            >
                {isPending ? "Reseting password..." : "Reset Password"}
            </button>
        </form>
    );
};

export default UpdatePasswordForm;