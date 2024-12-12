import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FarmerRegistrationChart } from "@/components/dashboard/FarmerRegistrationChart";
import { RegionalMap } from "@/components/dashboard/RegionalMap";
import { NewFarmersTable } from "@/components/dashboard/NewFarmersTable";

export default function DashboardPage() {
  return (
      <div className="flex-1 space-y-8 p-8">
        <DashboardHeader />
        <DashboardStats />
        <div className="grid gap-8 md:grid-cols-2">
          <FarmerRegistrationChart />
          <RegionalMap />
        </div>
        <NewFarmersTable />
      </div>
  );
}