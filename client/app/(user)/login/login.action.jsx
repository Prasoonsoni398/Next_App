"use server";
import { db } from "@/config/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateAccessToken, generateRefreshToken, setAuthCookies } from "@/lib/auth";

export const loginAction = async (formData) => {
  try {
    const { email, password } = Object.fromEntries(formData.entries());

    // Basic validation
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    // Check if user exists
    const [users] = await db.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (users.length === 0) {
      return { success: false, message: "Invalid email or password" };
    }

    const user = users[0];

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }



    // Check status
    if (user.status !== 'active') {
      return { success: false, message: `Your account is ${user.status}. Please contact support.` };
    }

    // Generate JWT tokens
    const payload = { userId: user.id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token to DB (optional depending on your security model, but good for revocation)
    await db.execute(
      `UPDATE users SET refresh_token = ?, last_login_at = NOW() WHERE id = ?`,
      [refreshToken, user.id]
    );

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    return {
      success: true,
      message: "Login successful! Redirecting...",
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      success: false,
      message: "An error occurred during login. Please try again.",
    };
  }
};
