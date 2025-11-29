"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/sellerProfile/me", {
        credentials: "include",
      });
      const data = await res.json();
      setProfile(data);
      setFormData(data);
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditModal(true);
  };

  const updateProfile = async () => {
    const res = await fetch("/api/sellerProfile/update", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setProfile(formData);
      setEditModal(false);
      toast.success("Profile updated Successfuly!")
    }
  };

  if (!profile) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500">Seller account information</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 drop-shadow-xl">
        {/* Main Profile Card */}
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Account</h2>
            <button
              onClick={handleEdit}
              className="px-2 sm:px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input label="User Name" value={profile.name} />
            <Input label="First Name" value={profile.fname} />
            <Input label="Last Name" value={profile.lname} />
            <Input label="Email" value={profile.email} />
            <Input label="Phone" value={profile.phone} />
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-3">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Street" value={profile.streat} />
              <Input label="City" value={profile.city} />
              <Input label="State" value={profile.state} />
              <Input label="Postal Code" value={profile.postalCode} />
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">About Me</h3>
            <textarea
              readOnly
              value={profile.aboutMe}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 resize-none"
              rows={4}
            />
          </div>
        </div>
      </div>

      {editModal && (
        <div className="fixed inset-0 sm:ml-60 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-4 sm:p-6 mx-2">

            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            {/* SCROLLABLE CONTENT */}
            <div className="max-h-[60vh] sm:max-h-none overflow-y-auto pr-1">

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {/* Row 1 */}
                <EditInput disabled label="User Name" field="name" formData={formData} setFormData={setFormData} />
                <EditInput label="First Name" field="fname" formData={formData} setFormData={setFormData} />
                <EditInput label="Last Name" field="lname" formData={formData} setFormData={setFormData} />

                {/* Row 2 */}
                <EditInput disabled label="Email" field="email" formData={formData} setFormData={setFormData} />
                <EditInput label="Phone" field="phone" formData={formData} setFormData={setFormData} />
                <EditInput label="Postal Code" field="postalCode" formData={formData} setFormData={setFormData} />

                {/* Row 3 */}
                <EditInput label="Street" field="streat" formData={formData} setFormData={setFormData} />
                <EditInput label="City" field="city" formData={formData} setFormData={setFormData} />
                <EditInput label="State" field="state" formData={formData} setFormData={setFormData} />

                {/* About Me */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <label className="block text-gray-600 text-sm mb-1">About Me</label>
                  <textarea
                    value={formData.aboutMe || ""}
                    onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    rows={3}
                  />
                </div>

              </div>

            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={updateProfile}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default Profile;

// Reusable Read-only Input Component
const Input = ({ label, value }) => (
  <div>
    <label className="block text-gray-500 text-sm mb-1">{label}</label>
    <input
      type="text"
      readOnly
      value={value || ""}
      className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
    />
  </div>
);

// Reusable Editable Input Component
const EditInput = ({ label, field, formData, setFormData, disabled }) => (
  <div>
    <label className="block text-gray-600 text-sm mb-1">{label}</label>
    <input
      disabled={disabled || false}
      type="text"
      value={formData[field] || ""}
      onChange={(e) =>
        setFormData({ ...formData, [field]: e.target.value })
      }
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);
