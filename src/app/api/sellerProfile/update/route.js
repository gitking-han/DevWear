import connectToMongo from "@/lib/db";
import sellerProfile from "@/models/sellerProfile";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToMongo();

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const body = await req.json();

    const { fname, lname, phone, streat, city, state, postalCode, aboutMe } = body;

    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let profile = await sellerProfile.findOne({ user: decoded.id });

    if (!profile) {
      profile = new sellerProfile({
        user: user._id,
        name: user.name,
        email: user.email,
        fname,
        lname,
        phone,
        streat,
        city,
        state,
        postalCode,
        aboutMe,
      });
    } else {
      profile.fname = fname;
      profile.lname = lname;
      profile.phone = phone;
      profile.streat = streat;
      profile.city = city;
      profile.state = state;
      profile.postalCode = postalCode;
      profile.aboutMe = aboutMe;
    }

    await profile.save();

    return NextResponse.json({ message: "Profile updated", profile });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
