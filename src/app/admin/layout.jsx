"use client";
import { styled, Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Topbar from "./layout/header/Topbar";
import Footer from "./layout/footer/page";
import theme from "./utils/theme";
import { DashboardProvider } from "../context/DashboardContext";
// import Footer from "../components/footer";

const MainWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  overflowX: "hidden",
}));


const ContentWrapper = styled("div")(({ theme }) => ({
  flexGrow: 1,
  paddingLeft: 0,
  transition: "padding-left 0.3s ease",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "270px", // sidebar width
  },
}));


const InnerContainer = styled(Container)(({ theme }) => ({
  paddingTop: "20px",
  maxWidth: "1200px",
  minHeight: "calc(100vh - 180px)",
}));


export default function RootLayout({ children }) {
  return (
    <>
    <div id="global-modal" className="fixed inset-0 z-[9999] pointer-events-none"></div>

      <DashboardProvider>
        <CssBaseline />
        {/* <Topbar /> */}
        <Sidebar />


        <MainWrapper>
          <ContentWrapper>
            <Header />
            <InnerContainer>{children}</InnerContainer>
            <Footer />
          </ContentWrapper>
        </MainWrapper>

      </DashboardProvider>



    </>
  );
}