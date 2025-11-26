import React, { useState } from "react";
import { MenuItem, Box, IconButton, Menu } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../shared/DashboardCard";
import dynamic from "next/dynamic";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const optionsMenu = ["Action", "Another Action", "Something else here"];

const ProfitExpenses = () => {
  // menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // theme colors
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.error.main;

  // chart options
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: "#adb0bb",
      toolbar: { show: true },
      height: 350,
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: 6,
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
    },
    yaxis: { tickAmount: 4 },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    { name: "Pixel", data: [9, 5, 3, 7, 5, 10, 3] },
    { name: "Ample", data: [6, 3, 9, 5, 4, 6, 4] },
  ];

  return (
    <DashboardCard

    
      title="Profit & Expenses"
      action={
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: { "aria-labelledby": "long-button" },
            }}
          >
            {optionsMenu.map((option) => (
              <MenuItem key={option} selected={option === "Pyxis"} onClick={handleClose}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    >
      <Box className="rounded-bars">
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          width="100%"
          height="350px"
        />
      </Box>
    </DashboardCard>
  );
};

export default ProfitExpenses;
