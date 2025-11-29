import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: "screencast-2-line-duotone",
    href: "/",
  },
  {
    id: uniqueId(),
    title: "Frontend Pages",
    icon: "feed-line-duotone",
    chip: "Pro",
    href: "https://spike-nextjs-pro-main.vercel.app/frontend-pages/homepage",
    children: [
      { id: uniqueId(), title: "Homepage", href: "/" },
      { id: uniqueId(), title: "About Us", href: "/about" },
      { id: uniqueId(), title: "Contact", href: "/contact" },
      { id: uniqueId(), title: "Products", href: "/shop" },
      { id: uniqueId(), title: "Orders", href: "/order" }
    ],
  },

  {
    navlabel: true,
    subheader: "UTILITIES",
  },
{
  id: uniqueId(),
  title: "Products",
  icon: "box-linear",
  href: "/admin/products",
},

{
  id: uniqueId(),
  title: "Stock",
  icon: "archive-linear",
  href: "/admin/stock",
},
{
  id: uniqueId(),
  title: "Orders",
  icon: "bill-check-linear",
  href: "/admin/orders",
},
{
  id: uniqueId(),
  title: "Profile",
  icon: "user-linear",
  href: "/admin/profile",
},


  {
    navlabel: true,
    subheader: "AUTH",
  },
  { id: uniqueId(), title: "Login", icon: "login-2-broken", href: "/login" },
  { id: uniqueId(), title: "Register", icon: "shield-user-linear", href: "/signup" },

  {
    navlabel: true,
    subheader: "OTHER",
  },
  {
    id: uniqueId(),
    title: "Menu Level",
    icon: "double-alt-arrow-down-bold-duotone",
    href: "https://spike-nextjs-pro-main.vercel.app/l1",
    children: [
      { id: uniqueId(), title: "Level 1", href: "https://spike-nextjs-pro-main.vercel.app/l1" },
      {
        id: uniqueId(),
        title: "Level 1.1",
        href: "https://spike-nextjs-pro-main.vercel.app/l1.1",
        children: [
          { id: uniqueId(), title: "Level 2", href: "https://spike-nextjs-pro-main.vercel.app/l2" },
          {
            id: uniqueId(),
            title: "Level 2.1",
            href: "https://spike-nextjs-pro-main.vercel.app/l2.1",
            children: [
              { id: uniqueId(), title: "Level 3", href: "https://spike-nextjs-pro-main.vercel.app/l3" },
              { id: uniqueId(), title: "Level 3.1", href: "https://spike-nextjs-pro-main.vercel.app/l3.1" },
            ],
          },
        ],
      },
    ],
  },

  { id: uniqueId(), title: "Disabled", icon: "forbidden-circle-line-duotone", href: "", disabled: true },
  { id: uniqueId(), title: "SubCaption", subtitle: "This is the sutitle", icon: "square-academic-cap-line-duotone", href: "https://spike-nextjs-pro-main.vercel.app/" },
  { id: uniqueId(), title: "Chip", icon: "archive-check-line-duotone", href: "https://spike-nextjs-pro-main.vercel.app/", chipColor: "error" },
  { id: uniqueId(), title: "Outlined", icon: "smile-circle-line-duotone", href: "https://spike-nextjs-pro-main.vercel.app/" },
  { id: uniqueId(), title: "External Link", external: true, icon: "link-bold-duotone", href: "https://google.com" },
];

export default Menuitems;
