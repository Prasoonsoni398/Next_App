"use server";
import { db } from "@/config/db";
import crypto from "crypto";
import { sendPasswordResetOTP } from "@/lib/mailer";

export const forgotPasswordAction = async (formData) => {
  try {
    const { email } = Object.fromEntries(formData.entries());

    if (!email) {
      return { success: false, message: "Email is required" };
    }

    const [users] = await db.execute(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      // Don't leak that the user doesn't exist for security reasons
      return { 
        success: true, 
        message: "If an account with that email exists, an OTP has been sent." 
      };
    }

    const user = users[0];
    
    // Generate 6-digit numeric OTP
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await db.execute(
      `UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?`,
      [resetOtp, resetOtpExpiresAt, user.id]
    );

    await sendPasswordResetOTP(email, resetOtp);

    return {
      success: true,
      message: "If an account with that email exists, an OTP has been sent.",
    };
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
