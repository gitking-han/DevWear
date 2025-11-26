'use client';
import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography } from '@mui/material';
import { IconBell } from '@tabler/icons-react';

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        aria-label="show notifications"
        color="inherit"
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="large"
      >
        <Badge variant="dot" color="primary">
          <IconBell size={21} stroke={1.5} />
        </Badge>
      </IconButton>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: { minWidth: 200 },
        }}
      >
        <MenuItem onClick={handleClose}>
          <Typography variant="subtitle1">New message received</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography variant="subtitle1">Payment received</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notification;
