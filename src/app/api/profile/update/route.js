import connectToMongo from "@/lib/db";
import Profile from "@/models/Profile";
import User from "@/models/User"; // ✅ import User schema
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        await connectToMongo();

        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const body = await req.json();
        const { phone, address, city, postalCode } = body;

        let profile = await Profile.findOne({ user: decoded.id });
        const user = await User.findById(decoded.id); // fetch user for name/email

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        if (!profile) {
            // ✅ create new profile using user name/email
            profile = new Profile({
                user: user._id,
                name: user.name,
                email: user.email,
                phone: phone || "",
                address: address || "",
                city: city || "",
                postalCode: postalCode || "",
            });
        } else {
            // update existing profile
            profile.phone = phone ?? profile.phone;
            profile.address = address ?? profile.address;
            profile.city = city ?? profile.city;
            profile.postalCode = postalCode ?? profile.postalCode;
        }

        await profile.save();

        return NextResponse.json({ message: "Profile updated successfully", profile });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}
