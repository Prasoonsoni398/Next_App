"use client";

import { useState, useTransition } from "react";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { forgotPasswordAction } from "./forgot-password.action";
import { resetPasswordOTPAction } from "./reset.action";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = Request OTP, 2 = Verify OTP & Reset
  const [email, setEmail] = useState("");
  
  const [isPending, startTransition] = useTransition();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRequestOTP = (formData) => {
    const submittedEmail = formData.get("email");
    
    startTransition(async () => {
      const res = await forgotPasswordAction(formData);
      if (res.success) {
        toast.success(res.message);
        setEmail(submittedEmail);
        setStep(2);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleResetPassword = (formData) => {
    // Append the email that we saved from step 1
    formData.append("email", email);

    startTransition(async () => {
      const res = await resetPasswordOTPAction(formData);
      if (res.success) {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
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
          {step === 1 
            ? "Enter your email address and we'll send you an OTP."
            : `Enter the 6-digit OTP sent to ${email} and your new password.`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-800">
          
          {step === 1 && (
            <form className="space-y-6" action={handleRequestOTP}>
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
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2"
                >
                  {isPending ? <Loader className="animate-spin" /> : <span>Send OTP</span>}
                </button>
              </div>
              
              <div className="text-center text-sm">
                  <Link href="/login" className="font-medium text-pink-500 hover:text-pink-400">
                    Return to login
                  </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="space-y-6" action={handleResetPassword}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                  6-Digit OTP Code
                </label>
                <div className="mt-1">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    className="appearance-none tracking-widest text-center text-xl block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-pink-500 focus:border-pink-500 bg-gray-800 text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
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
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4 text-gray-400 hover:text-white"
                  >
                    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2 text-gray-300">
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
                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    className="absolute inset-y-0 right-0 flex items-center cursor-pointer pr-4 text-gray-400 hover:text-white"
                  >
                    {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900 flex items-center justify-center space-x-2"
                >
                  {isPending ? <Loader className="animate-spin" /> : <span>Reset Password</span>}
                </button>
              </div>
              
              <div className="text-center text-sm">
                  <button type="button" onClick={() => setStep(1)} className="font-medium text-pink-500 hover:text-pink-400">
                    Request new OTP
                  </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
