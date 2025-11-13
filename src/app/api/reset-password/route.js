import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectToMongo from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToMongo();
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }


    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
