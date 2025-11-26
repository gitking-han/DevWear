"use client";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Stack, Typography, Avatar, Box } from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import DashboardCard from "../shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TrafficDistribution = () => {
  const theme = useTheme();

  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.secondary.light;
  const successlight = theme.palette.success.light;

  const optionscolumnchart = {
    chart: {
  type: "donut",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  toolbar: { show: false },
  height: 250, // increase this number
},

    colors: [secondary, error, primary],
    plotOptions: { pie: { startAngle: 0, endAngle: 360, donut: { size: "75%" } } },
    tooltip: { theme: theme.palette.mode === "dark" ? "dark" : "light", fillSeriesColor: false },
    stroke: { show: false },
    dataLabels: { enabled: false },
    legend: { show: false },
  };
  const seriescolumnchart = [5368, 3500, 4106];

  return (
    <DashboardCard title="Traffic Distribution">
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, flexWrap: "wrap" }}>
        {/* Left content */}
        <Box sx={{ flex: 1, minWidth: "200px" }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            $36,358
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: "center" }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar sx={{ bgcolor: successlight, width: 21, height: 21 }}>
                <IconArrowUpLeft width={18} color="#39B69A" />
              </Avatar>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                +9%
              </Typography>
            </Stack>
            <Typography variant="subtitle2" color="textSecondary">
              last year
            </Typography>
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar sx={{ width: 9, height: 9, bgcolor: primary }} />
              <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 12 }}>
                Organic
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar sx={{ width: 9, height: 9, bgcolor: error }} />
              <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: 12 }}>
                Referral
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right Chart */}
        <Box sx={{ flex: 1, minWidth: "150px" }}>
          <Chart options={optionscolumnchart} series={seriescolumnchart} type="donut" width="100%" height="240px" />

        </Box>
      </Box>
    </DashboardCard>
  );
};

export default TrafficDistribution;
