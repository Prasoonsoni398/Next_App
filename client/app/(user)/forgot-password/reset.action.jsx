"use server";
import { db } from "@/config/db";
import bcrypt from "bcryptjs";

export const resetPasswordOTPAction = async (formData) => {
  try {
    const { email, otp, password, confirmPassword } = Object.fromEntries(formData.entries());

    if (!email || !otp || !password || !confirmPassword) {
      return { success: false, message: "All fields are required" };
    }

    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    if (password !== confirmPassword) {
      return { success: false, message: "Passwords do not match" };
    }

    // Find the user with this email and OTP
    const [users] = await db.execute(
      `SELECT id, reset_token_expires_at FROM users WHERE email = ? AND reset_token = ?`,
      [email, otp]
    );

    if (users.length === 0) {
      return { success: false, message: "Invalid OTP code." };
    }

    const user = users[0];

    // Check if token has expired
    const now = new Date();
    const expiresAt = new Date(user.reset_token_expires_at);

    if (now > expiresAt) {
      return { success: false, message: "OTP code has expired. Please request a new one." };
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the password and clear reset token
    await db.execute(
      `UPDATE users SET password = ?, reset_token = NULL, reset_token_expires_at = NULL WHERE id = ?`,
      [hashedPassword, user.id]
    );

    return {
      success: true,
      message: "Password reset successful! You can now log in.",
    };
  } catch (error) {
    console.error("Reset Password Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
