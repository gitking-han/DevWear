import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const SimpleBarStyle = styled(SimpleBar)(() => ({
  maxHeight: "100%",
}));

const Scrollbar = (props) => {
  const { children, sx, ...other } = props;

  const theme = useTheme(); // ✅ get theme from ThemeProvider
  const lgDown = useMediaQuery(theme.breakpoints.down("lg")); // ✅ pass theme to useMediaQuery

  if (lgDown) {
    return (
      <Box sx={{ overflowX: "auto", ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <SimpleBarStyle sx={sx} {...other}>
      {children}
    </SimpleBarStyle>
  );
};

export default Scrollbar;
