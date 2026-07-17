"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { loginAction } from "./login.action";
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
        <span>Sign In</span>
      )}
    </button>
  );
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email successfully verified! You can now log in.");
    }
  }, [searchParams]);

  const handleLoginSubmit = (formData) => {
    startTransition(async () => {
      const res = await loginAction(formData);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handlePasswordToggle = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen bg-[rgb(14,14,14)] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto">
          <h1 className="text-4xl text-pink-500 font-bold mb-8 text-center">
            Welcome Back
          </h1>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-8 border border-gray-800">
            <form className="space-y-6" action={handleLoginSubmit}>
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
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-pink-500 hover:text-pink-400 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
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

              {/* Submit Button */}
              <SubmitButton />
              
              <div className="text-center mt-4 text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-pink-500 hover:text-pink-400 transition-colors">
                  Create one
                </Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
