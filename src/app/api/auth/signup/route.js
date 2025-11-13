import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToMongo from "@/lib/db"; // your db connection
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectToMongo();
    const { name, email, password } = await req.json();

    // check user exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json({ success: true, token, user });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
