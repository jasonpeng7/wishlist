import { supabase } from "../../../../../utils/supabase";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists with this email
    const { data: user, error: findError } = await supabase
      .from("users")
      .select("id, username, email")
      .eq("email", email)
      .single();

    if (findError && findError.code !== "PGRST116") {
      console.error("Error finding user:", findError);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    // Always return success to prevent email enumeration attacks
    // But only proceed if user actually exists
    if (user) {
      // Generate a secure reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      // Store reset token in database
      const { error: insertError } = await supabase
        .from("password_reset_tokens")
        .insert([{
          user_id: user.id,
          token: resetToken,
          expires_at: expiresAt.toISOString(),
          used: false
        }]);

      if (insertError) {
        console.error("Error storing reset token:", insertError);
        return NextResponse.json(
          { error: "Internal server error" },
          { status: 500 }
        );
      }

      // Send password reset email via Mailgun
      const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
      
      try {
        const formData = new URLSearchParams();
        formData.append('from', `Wishlist App <noreply@${process.env.MAILGUN_DOMAIN}>`);
        formData.append('to', user.email);
        formData.append('subject', 'Reset Your Password - Wishlist App');
        formData.append('text', `
Hello ${user.username},

You requested to reset your password for your Wishlist App account.

Click the link below to reset your password:
${resetLink}

This link will expire in 15 minutes.

If you didn't request this password reset, please ignore this email.

Best regards,
Wishlist App Team
        `);
        formData.append('html', `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #1e40af; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 20px 0;
        }
        .footer { margin-top: 30px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Reset Your Password</h2>
        <p>Hello ${user.username},</p>
        <p>You requested to reset your password for your Wishlist App account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetLink}" class="button">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <div class="footer">
            <p>Best regards,<br>Wishlist App Team</p>
        </div>
    </div>
</body>
</html>
        `);

        const emailResponse = await fetch(`https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`api:${process.env.MAILGUN_API_KEY}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData,
        });

        if (!emailResponse.ok) {
          console.error('Failed to send email:', await emailResponse.text());
          // Don't fail the request, just log the error
        } else {
          console.log(`Password reset email sent to ${user.email}`);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't fail the request, just log the error
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json(
      { message: "If an account with that email exists, a password reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
