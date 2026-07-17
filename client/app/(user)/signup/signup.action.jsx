"use server";
import { db } from "@/config/db";
import bcrypt from "bcryptjs";

export const signupAction = async (formData) => {
  try {
    const { fullName, email, password } = Object.fromEntries(formData.entries());

    // Basic validation
    if (!fullName || !email || !password) {
      return { success: false, message: "All fields are required" };
    }
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    // Check if user already exists
    const [existingUsers] = await db.execute(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );

    if (existingUsers.length > 0) {
      return { success: false, message: "User with this email already exists" };
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user
    await db.execute(
      `INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)`,
      [fullName, email, hashedPassword]
    );

    return {
      success: true,
      message: "Registration successful! Welcome aboard.",
    };
  } catch (error) {
    console.error("Signup Error:", error);
    
    // In case the users table does not exist
    if (error.code === 'ER_NO_SUCH_TABLE') {
        return {
            success: false,
            message: "Database table 'users' does not exist. Please create it first.",
        };
    }
    
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  }
};
