"use client";

import { useState, useTransition } from "react";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { forgotPasswordAction } from "./forgot-password.action";
import Link from "next/link";
import toast from "react-hot-toast";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2"
    >
      {pending ? (
        <Loader className="animate-spin" />
      ) : (
        <span>Send Reset Link</span>
      )}
    </button>
  );
};

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    startTransition(async () => {
      const res = await forgotPasswordAction(formData);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="min-h-screen bg-[rgb(14,14,14)] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <form className="space-y-6" action={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-800 text-white"
                />
              </div>
            </div>

            <div>
              <SubmitButton />
            </div>
            
            <div className="text-center text-sm">
                <Link href="/login" className="font-medium text-pink-500 hover:text-pink-400">
                  Return to login
                </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
