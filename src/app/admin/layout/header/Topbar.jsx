// "use client";
// import { Box, AppBar, Toolbar, Stack, Button, styled } from "@mui/material";
// import { Typography } from "@mui/material";
// import Link from "next/link";
// import { Icon } from "@iconify/react";
// import LivePreviewDropdown from "./LivePreviewDropdown";

// const Topbar = () => {
//  const AppBarStyled = styled(AppBar)(({ theme }) => ({
//   boxShadow: "none",
//   background: "linear-gradient(90deg,#0f0533 0,#1b0a5c 100%)",
//   justifyContent: "center",
//   [theme.breakpoints.up("lg")]: { minHeight: "72px" },
//   position: "sticky", // sticky position
//   top: 0,             // stick to top
//   zIndex: 9,
// }));


//   const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
//     width: "100%",
//     color: theme.palette.text.secondary,
//   }));

//   const GhostButton = styled(Button)(({ theme }) => ({
//     color: theme.palette.primary.contrastText,
//     backgroundColor: "transparent",
//     boxShadow: "none",
//     borderRadius: "7px",
//     fontWeight: 400,
//     "&:hover": { backgroundColor: theme.palette.primary.main },
//     "& .MuiButton-startIcon": { marginRight: "4px" },
//   }));

//   return (
//     <AppBarStyled position="sticky" color="default">
//       <ToolbarStyled
//         sx={{
//           padding: "16px 24px",
//           justifyContent: "space-between",
//           flexDirection: { md: "row", xs: "column" },
//           gap: "16px",
//           display: "flex",
//         }}
//       >
//         {/* Left Section */}
//         <Stack
//           spacing={2}
//           direction="row"
//           sx={{
//             alignItems: "center",
//             display: { xs: "none", md: "flex" },
//           }}
//         >
//           <Link href="/">
//             <img src="/images/logos/logo-wrappixel.svg" width={147} alt="logo" />
//           </Link>
//           <Stack
//             direction="row"
//             sx={{
//               gap: "16px",
//               paddingLeft: "20px",
//               borderLeft: "1px solid rgba(255,255,255,.4)",
//               display: { xs: "none", lg: "flex" },
//             }}
//           >
//             <Link href="https://www.wrappixel.com/templates/category/nextjs-templates/">
//               <GhostButton startIcon={<Icon icon="solar:window-frame-linear" width={20} />}>
//                 Templates
//               </GhostButton>
//             </Link>
//             <Link href="https://support.wrappixel.com/">
//               <GhostButton startIcon={<Icon icon="solar:question-circle-linear" width={20} />}>
//                 Help
//               </GhostButton>
//             </Link>
//             <Link href="https://www.wrappixel.com/hire-us/">
//               <GhostButton startIcon={<Icon icon="solar:case-round-linear" width={20} />}>
//                 Hire Us
//               </GhostButton>
//             </Link>
//           </Stack>
//         </Stack>

//         {/* Right Section */}
//         <Stack
//           direction="row"
//           sx={{
//             alignItems: "center",
//             flexDirection: { md: "row", xs: "column" },
//             gap: "16px",
//           }}
//         >
//           <Typography
//             variant="h6"
//             sx={{
//               textTransform: "uppercase",
//               fontSize: "14px",
//               background: "linear-gradient(90deg,#fff 0,#8d70f8 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//             }}
//           >
//             Checkout Pro Version
//           </Typography>

//           <Stack direction="row" spacing={1} alignItems="center">
//             <LivePreviewDropdown />
//             <Button
//               sx={{ gap: "8px", borderRadius: "7px", backgroundColor: "#8d70f8", fontSize: "16px" }}
//               variant="contained"
//               href="#"
//             >
//               <Icon icon="solar:crown-linear" width={18} />
//               Get Pro
//             </Button>
//             <Button
//               sx={{ gap: "8px", borderRadius: "7px", color: "#000", backgroundColor: "#b3f143", fontSize: "16px" }}
//               variant="contained"
//               href="#"
//             >
//               <Icon icon="solar:bolt-linear" width={18} />
//               All Access Pass
//             </Button>
//           </Stack>
//         </Stack>
//       </ToolbarStyled>
//     </AppBarStyled>
//   );
// };

// export default Topbar;
"use client";
import { styled } from "@mui/material";
import Navbar from "@/app/components/navbar";

const TopbarWrapper = styled("div")({
  position: "sticky", // stick to top
  top: 0,
  zIndex: 9, // above other content
});

const Topbar = () => {
  return (
    <TopbarWrapper>
      <Navbar />
    </TopbarWrapper>
  );
};

export default Topbar;
