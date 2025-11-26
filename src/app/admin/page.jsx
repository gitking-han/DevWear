"use client";
import PageContainer from "./components/container/PageContainer";
// components
import ProfitExpenses from "./components/dashboard/ProfitExpenses";
import TrafficDistribution from "./components/dashboard/TrafficDistribution";
import UpcomingSchedules from "./components/dashboard/UpcomingSchedules";
import TopPayingClients from "./components/dashboard/TopPayingClients";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Admin analytics overview">
      {/* Row 1 */}
      <div className="flex flex-wrap gap-2 mb-1 items-stretch">
        <div className="flex-2 min-w-[300px] flex">
          <div className="flex-1 p-4 rounded-lg bg-white">
            <ProfitExpenses />
          </div>
        </div>

        <div className="flex-1 min-w-[280px] flex flex-col gap-1">
          <div className="flex-1 p-4 rounded-lg bg-white">
            <TrafficDistribution />
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-wrap gap-2 mb-1 items-stretch">
        <div className="flex-2 min-w-[300px] flex">
          <div className="flex-1 p-4 rounded-lg bg-white">
            <UpcomingSchedules />
          </div>
        </div>

        <div className="flex-1 min-w-[300px] flex">
          <div className="flex-1 p-4 rounded-lg bg-white">
            <TopPayingClients />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
