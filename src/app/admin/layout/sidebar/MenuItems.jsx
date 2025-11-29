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
    href: "/admin",
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




];

export default Menuitems;
