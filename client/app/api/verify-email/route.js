import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Verification token is required." },
        { status: 400 }
      );
    }

    // Find the user with this token
    const [users] = await db.execute(
      `SELECT id, is_email_verified, verification_token_expires_at FROM users WHERE verification_token = ?`,
      [token]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification token." },
        { status: 400 }
      );
    }

    const user = users[0];

    // Check if already verified
    if (user.is_email_verified) {
      return NextResponse.json(
        { success: true, message: "Email is already verified." }
      );
    }

    // Check if token has expired
    const now = new Date();
    const expiresAt = new Date(user.verification_token_expires_at);

    if (now > expiresAt) {
      return NextResponse.json(
        { success: false, message: "Verification token has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Update the user
    await db.execute(
      `UPDATE users SET is_email_verified = 1, email_verified_at = NOW(), verification_token = NULL, verification_token_expires_at = NULL WHERE id = ?`,
      [user.id]
    );

    // Redirect to login page or a success page.
    return NextResponse.redirect(new URL("/login?verified=true", request.url));
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during verification." },
      { status: 500 }
    );
  }
}
