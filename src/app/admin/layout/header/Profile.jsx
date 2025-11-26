'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import { IconUser, IconMail } from "@tabler/icons-react";

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    // Close menu first
    handleClose();

    // Remove all tokens
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redirect to login (replace with your actual login path)
    setTimeout(() => {
      router.replace("/login"); // or "/auth/login"
    }, 50);

    // Prevent back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => router.replace("/login");
  };

  return (
    <Box>
      <IconButton size="large" onClick={handleClick}>
        <Avatar src="/images/profile/user-1.jpg" alt="profile" sx={{ width: 35, height: 35 }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{ "& .MuiMenu-paper": { width: 200 } }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon><IconUser width={20} /></ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon><IconMail width={20} /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Box sx={{ mt: 1, py: 1, px: 2 }}>
          <button
            onClick={handleLogout}
            className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors"
          >
            Logout
          </button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
