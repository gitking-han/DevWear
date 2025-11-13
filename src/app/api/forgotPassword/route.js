import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import connectToMongo from "@/lib/db";
import User from "@/models/User"; // adjust path as needed

export async function POST(req) {
  try {
    await connectToMongo();
    const { email } = await req.json();


    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );


    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;


    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });


    await transporter.sendMail({
      from: `"Codeswear" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <html>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color:#f9fafb; margin:0; padding:0;">
    <table width="100%" cellspacing="0" cellpadding="0" style="background-color:#f9fafb; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="100%" style="max-width:600px; background-color:#ffffff; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.05); overflow:hidden;">
            <tr>
              <td style="background-color:#ec4899; padding:20px 30px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px; font-weight:600;">Codeswear</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px;">
                <h2 style="color:#111827; font-size:20px; font-weight:600;">Password Reset Request</h2>
                <p style="color:#4b5563; font-size:15px; line-height:1.6; margin-top:10px;">
                  We received a request to reset your password. Click the button below to set a new one.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a href="${resetLink}" target="_blank"
                    style="background-color:#ec4899; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:8px; display:inline-block; font-weight:500; font-size:15px;">
                    Reset My Password
                  </a>
                </div>

                <p style="color:#6b7280; font-size:14px; line-height:1.6;">
                  If you didn’t request a password reset, you can safely ignore this email.
                </p>
                <p style="color:#9ca3af; font-size:13px; margin-top:20px;">
                  This link will expire in <strong>15 minutes</strong> for your security.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f3f4f6; text-align:center; padding:15px;">
                <p style="color:#9ca3af; font-size:13px; margin:0;">
                  © ${new Date().getFullYear()} Codeswear. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

      `,
    });

    return NextResponse.json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error("Error sending reset email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
