import { supabase } from "../../../../../utils/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 1) {
      return NextResponse.json(
        { error: "Password must be at least 1 character long" },
        { status: 400 }
      );
    }

    // Find the reset token
    const { data: resetTokenData, error: tokenError } = await supabase
      .from("password_reset_tokens")
      .select("user_id, expires_at, used")
      .eq("token", token)
      .eq("used", false)
      .single();

    if (tokenError || !resetTokenData) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(resetTokenData.expires_at);
    if (now > expiresAt) {
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 }
      );
    }

    // Hash the new password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update the user's password
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: passwordHash })
      .eq("id", resetTokenData.user_id);

    if (updateError) {
      console.error("Error updating password:", updateError);
      return NextResponse.json(
        { error: "Failed to update password" },
        { status: 500 }
      );
    }

    // Mark the reset token as used
    const { error: markUsedError } = await supabase
      .from("password_reset_tokens")
      .update({ used: true })
      .eq("token", token);

    if (markUsedError) {
      console.error("Error marking token as used:", markUsedError);
      // Don't fail the request for this, just log it
    }

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
