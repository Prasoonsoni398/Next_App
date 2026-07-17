import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken, setAuthCookies } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token provided." },
        { status: 401 }
      );
    }

    // Verify token payload
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh token." },
        { status: 401 }
      );
    }

    // Check token against database to ensure it wasn't revoked
    const [users] = await db.execute(
      `SELECT id, role, email FROM users WHERE id = ? AND refresh_token = ?`,
      [decoded.userId, refreshToken]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: "Refresh token has been revoked or is invalid." },
        { status: 401 }
      );
    }

    const user = users[0];

    // Generate new tokens
    const payload = { userId: user.id, role: user.role, email: user.email };
    const newAccessToken = generateAccessToken(payload);
    
    // We can also rotate the refresh token here if we want, but keeping it same for now
    // If we wanted to rotate:
    // const newRefreshToken = generateRefreshToken(payload);
    // await db.execute(`UPDATE users SET refresh_token = ? WHERE id = ?`, [newRefreshToken, user.id]);
    // await setAuthCookies(newAccessToken, newRefreshToken);
    
    // Just refreshing the access token
    cookieStore.set('access_token', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: "Token refreshed successfully",
    });

  } catch (error) {
    console.error("Refresh Token Error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred during token refresh." },
      { status: 500 }
    );
  }
}
