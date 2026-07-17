"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { resetPasswordAction } from "./reset-password.action";
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
        <span>Reset Password</span>
      )}
    </button>
  );
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData) => {
    if (!token) {
      toast.error("Missing reset token.");
      return;
    }
    
    // Add token to form data
    formData.append("token", token);

    startTransition(async () => {
      const res = await resetPasswordAction(formData);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handlePasswordToggle = () => setPasswordVisible(!passwordVisible);
  const handleConfirmPasswordToggle = () => setConfirmPasswordVisible(!confirmPasswordVisible);

  if (!token) {
    return (
      <div className="min-h-screen bg-[rgb(14,14,14)] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Link</h2>
          <p className="text-gray-400 mb-6">No reset token was found in the URL.</p>
          <Link href="/forgot-password" className="text-pink-500 hover:text-pink-400">
            Request a new password reset link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(14,14,14)] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-pink-500">
          Create new password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Please enter your new password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          <form className="space-y-6" action={handleSubmit}>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-white placeholder-gray-400"
                />

                <button
                  type="button"
                  onClick={handlePasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4 text-gray-400 hover:text-white"
                >
                  {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  minLength={6}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-white placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={handleConfirmPasswordToggle}
                  className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4 text-gray-400 hover:text-white"
                >
                  {confirmPasswordVisible ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <SubmitButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
