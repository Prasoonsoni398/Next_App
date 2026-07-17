"use server";
import { db } from "@/config/db";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/mailer";

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
        message: "If an account with that email exists, we have sent a password reset link." 
      };
    }

    const user = users[0];
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.execute(
      `UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?`,
      [resetToken, resetTokenExpiresAt, user.id]
    );

    await sendPasswordResetEmail(email, resetToken);

    return {
      success: true,
      message: "If an account with that email exists, we have sent a password reset link.",
    };
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return {
      success: false,
      message: "An error occurred. Please try again.",
    };
  }
};
