import connectToMongo from "@/lib/db";
import sellerProfile from "@/models/sellerProfile";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToMongo();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let profile = await sellerProfile.findOne({ user: decoded.id }).lean();

    // Auto-create empty profile if missing
    if (!profile) {
      profile = {
        fname: "",
        lname: "",
        phone: "",
        streat: "",
        city: "",
        state: "",
        aboutMe: "",
        postalCode: "",
      };
    }

    return NextResponse.json({
      name: user.name,
      email: user.email,
      ...profile,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
