'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <div className="border-t border-gray-200 py-4">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DevWear. All rights reserved.
        </p>
      </div>
    </Box>
  );
};

export default Footer;
