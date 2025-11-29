import mongoose from "mongoose";

const sellerProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    name: { type: String, required: true },
    fname: { type: String, required: true},
    lname: { type: String, required: true},
    email: { type: String, required: true }, 
    phone: { type: String, default: "" },
    streat: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    aboutMe:{ type: String, default: ""},
    postalCode: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.models.sellerProfile || mongoose.model("sellerProfile", sellerProfileSchema);