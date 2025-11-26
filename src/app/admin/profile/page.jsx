"use client";

import React, { useState } from "react";

const dummyProfile = {
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  email: "john@example.com",
  about: "This is a dummy user profile description.",
  avatarUrl: "/images/profile/user-1.jpg",
  friends: 22,
  photos: 10,
  comments: 89,
  address: {
    line1: "123 Main St",
    city: "New York",
    country: "USA",
    zip: "10001",
  },
};

const Profile = () => {
  const [profile] = useState(dummyProfile);

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-500">User account overview</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 drop-shadow-2xl">
        {/* Left Card */}
        

        {/* Right Card */}
        <div className="w-full bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Account</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Username
              </label>
              <input
                type="text"
                readOnly
                value={profile.username}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                readOnly
                value={profile.email}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">
                First Name
              </label>
              <input
                type="text"
                readOnly
                value={profile.firstName}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-gray-500 text-sm mb-1">
                Last Name
              </label>
              <input
                type="text"
                readOnly
                value={profile.lastName}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="text-gray-700 font-semibold mb-2">Contact Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                readOnly
                value={profile.address.line1}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                placeholder="Address"
              />
              <input
                type="text"
                readOnly
                value={profile.address.city}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                placeholder="City"
              />
              <input
                type="text"
                readOnly
                value={profile.address.country}
                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                placeholder="Country"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-2">About Me</h3>
            <textarea
              readOnly
              value={profile.about}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 resize-none"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
