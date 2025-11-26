// app/context/DashboardContext.js
import { createContext, useState } from "react";

// Create the context
export const DashboardContext = createContext({});

// Create a provider component
export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    user: "Demo User",
    notifications: 3,
    revenue: 1000,
  });

  // Mobile sidebar state
  const [isMobileSidebar, setIsMobileSidebar] = useState(false);

  return (
    <DashboardContext.Provider
      value={{
        dashboardData,
        setDashboardData,
        isMobileSidebar,
        setIsMobileSidebar,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
