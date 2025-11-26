'use client';
import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';

// Styled Menu
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 7,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: '#000c29',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '16px',
    },
    '& .MuiMenuItem-root': {
      '&:active': {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

// Styled Button
const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '16px',
  color: '#ffffff',
  padding: '5px 16px',
  textTransform: 'none',
  display: 'flex',
  borderRadius: '7px',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid rgba(255,255,255,.4)',
  '&:hover': {
    backgroundColor: '#8d70f8',
  },
}));

// Menu items data
const MenuItems = [
  { id: 1, img: '/images/svgs/next-cat-icon.svg', title: 'NextJs Version', href: 'https://www.wrappixel.com/templates/spike-nextjs-admin-template/?ref=376#demos' },
  { id: 2, img: '/images/svgs/angular-cat-icon.svg', title: 'Angular Version', href: 'https://www.wrappixel.com/templates/spike-angular-admin-template/?ref=376#demos' },
  { id: 3, img: '/images/svgs/vue-cat-icon.svg', title: 'VueJs Version', href: 'https://www.wrappixel.com/templates/spike-bootstrap-admin-dashboard/?ref=376#demos' },
  { id: 4, img: '/images/svgs/nuxt-cat-icon.svg', title: 'NuxtJs Version', href: 'https://www.wrappixel.com/templates/spike-nuxtjs-admin-template/?ref=376#demos' },
  { id: 5, img: '/images/svgs/tailwindcss.svg', title: 'Tailwind Version', href: 'https://www.wrappixel.com/templates/spike-tailwind-admin-template/?ref=376#demos' },
  { id: 6, img: '/images/svgs/bt-cat-icon.svg', title: 'Bootstrap Version', href: 'https://www.wrappixel.com/templates/spike-bootstrap-admin-dashboard/?ref=376#demos' },
];

const LivePreviewDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      <StyledButton
        aria-controls={open ? 'live-preview-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Live Preview
      </StyledButton>

      <StyledMenu
        id="live-preview-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {MenuItems.map((item) => (
          <Link key={item.id} href={item.href} target="_blank" passHref>
            <MenuItem
              onClick={handleClose}
              sx={{ gap: '12px', borderRadius: '7px', padding: '12px 18px' }}
            >
              <img src={item.img} width={18} alt="logo" />
              {item.title}
            </MenuItem>
          </Link>
        ))}
      </StyledMenu>
    </div>
  );
};

export default LivePreviewDropdown;
