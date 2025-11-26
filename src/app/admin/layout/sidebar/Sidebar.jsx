import { useMediaQuery, useTheme, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";
import { useContext } from "react";
import { DashboardContext } from "@/app/context/DashboardContext";
import Scrollbar from "../../components/custom-scroll/Scrollbar";

const Sidebar = () => {
  const theme = useTheme(); // Get theme from ThemeProvider
  const lgUp = useMediaQuery(theme.breakpoints.up("lg")); // Pass theme to useMediaQuery
  const { isMobileSidebar, setIsMobileSidebar } = useContext(DashboardContext);

  const sidebarWidth = "270px";

  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open
          variant="permanent"
          slotProps={{
            paper: {
              sx: {
                width: sidebarWidth,
                boxShadow: "0 9px 17.5px rgba(0,0,0,0.05)!important",
                top: "0px",
              },
            },
          }}
        >
          <Scrollbar sx={{ height: "calc(100% - 73px)" }}>
            <SidebarItems />
          </Scrollbar>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      
      anchor="left"
      open={isMobileSidebar}
      onClose={() => setIsMobileSidebar(!isMobileSidebar)}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: sidebarWidth,
            boxShadow: "0 9px 17.5px rgba(0,0,0,0.05)!important",
            overflowX: "hidden",
          },
        },
      }}
    >
      {/* Sidebar For Mobile */}
      <Scrollbar sx={{ height: "calc(100% - 73px)", overflowX: "hidden" }}>
        <SidebarItems />
      </Scrollbar>
    </Drawer>
  );
};

export default Sidebar;
