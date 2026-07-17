"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { signupAction } from "./signup.action";
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
        <span>Create Account</span>
      )}
    </button>
  );
};

export default function RegistrationForm() {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSignupSubmit = (formData) => {
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    startTransition(async () => {
      const res = await signupAction(formData);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleConfirmPasswordToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-[rgb(14,14,14)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl text-pink-500 font-bold mb-8 text-center">
            Create Account
          </h1>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
            <form className="space-y-6" action={handleSignupSubmit}>
              {/* Full Name Field */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-white placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-2 text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    minLength={6}
                    placeholder="Create a password"
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
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    minLength={6}
                    placeholder="Confirm your password"
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

              {/* Submit Button */}
              <SubmitButton />
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
