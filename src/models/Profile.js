// models/Profile.js
import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true }, // duplicated for quick access
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    postalCode: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
