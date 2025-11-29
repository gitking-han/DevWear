import connectToMongo from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongo();

    
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) 
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    
    const profile = await Profile.findOne({ user: decoded.id }).lean();
    if (!profile) 
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    
    const user = await User.findById(decoded.id).lean();
    if (!user) 
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    
    const result = {
      name: user.name,
      email: user.email,
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      postalCode: profile.postalCode || "",
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
