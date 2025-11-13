"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function ProfilePage() {
    const [profile, setProfile] = useState({

        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        paymentMethod: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                if (res.ok) {
                    setProfile({

                        name: data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        city: data.city || "",
                        postalCode: data.postalCode || "",
                        paymentMethod: data.paymentMethod || "",
                    });
                } else {
                    toast.error(data.error || "Failed to load profile");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                toast.error("Error fetching profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem("token");

            const res = await fetch("/api/profile/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    phone: profile.phone,
                    address: profile.address,
                    city: profile.city,
                    postalCode: profile.postalCode,
                    paymentMethod: profile.paymentMethod,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Profile updated successfully!");
                setEditOpen(false);
            } else {
                toast.error(data.error || "Failed to update profile");
            }
        } catch (err) {
            console.error("Update failed:", err);
            toast.error("Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    if (loading)
        return (
            <>
                <Navbar />
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                </div>
                <Footer />
            </>
        );

    return (
        <>
            <Navbar />

            <div className="max-w-4xl mx-auto mt-12 p-6 rounded-lg">
                <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center">My Profile</h1>

                <div className="bg-white rounded-lg shadow-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-500 text-sm mb-1">Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            readOnly
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            readOnly
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-sm mb-1">Phone</label>
                        <input
                            type="text"
                            value={profile.phone || ""}
                            readOnly
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-500 text-sm mb-1">City</label>
                        <input
                            type="text"
                            value={profile.city || ""}
                            readOnly
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-500 text-sm mb-1">Address</label>
                        <textarea
                            value={profile.address || ""}
                            readOnly
                            rows="2"
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm resize-none"
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block text-gray-500 text-sm mb-1">Postal Code</label>
                        <input
                            type="text"
                            value={profile.postalCode || ""}
                            readOnly
                            className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-800 cursor-not-allowed text-sm"
                        />
                    </div>

                    <div className="col-span-2 text-right mt-4">
                        <button
                            onClick={() => setEditOpen(true)}
                            className="bg-pink-600 text-white py-2 px-6 rounded-md hover:bg-pink-700 transition font-medium"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>


            {/* Edit Modal */}
            {editOpen && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white w-full max-w-2xl p-4 md:p-6 rounded-lg shadow-xl relative">
                        <h2 className="text-xl md:text-2xl font-semibold text-pink-600 mb-4 md:mb-6 text-center md:text-left">
                            Edit Profile
                        </h2>

                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">

                            <div>
                                <label className="block text-gray-500 text-sm mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    readOnly
                                    disabled
                                    className="w-full border rounded-md px-2 py-1 bg-gray-100 cursor-not-allowed text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    readOnly
                                    disabled
                                    className="w-full border rounded-md px-2 py-1 bg-gray-100 cursor-not-allowed text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-1">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-500 text-sm mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={profile.city}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-500 text-sm mb-1">Address</label>
                                <textarea
                                    name="address"
                                    value={profile.address}
                                    onChange={handleChange}
                                    rows="2"
                                    className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-500 text-sm mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={profile.postalCode}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                                />
                            </div>

                            <div className="col-span-2 flex justify-end gap-2 mt-3">
                                <button
                                    type="button"
                                    onClick={() => setEditOpen(false)}
                                    className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition font-medium text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-3 py-1 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition font-medium text-sm disabled:opacity-70"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            <Footer />
        </>
    );
}
