"use client";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { FarmerRegistrationChart } from "@/components/dashboard/FarmerRegistrationChart";
import { RegionalMap } from "@/components/dashboard/RegionalMap";
import { NewFarmersTable } from "@/components/dashboard/NewFarmersTable";
import { useAnalysis } from "@/hooks/useDashboard";

export default function DashboardPage() {
  // Local state to keep track of the selected time period
  const [timePeriod, setTimePeriod] = useState("year");

  // Callback function to update the time period from DashboardHeader
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  // Fetch data based on the selected time period using the useAnalysis hook
  const { data, isError, isLoading, isRefetching, refetch } = useAnalysis(timePeriod);

  if (isLoading) {
    return <div>Loading...</div>;  // Display loading state
  }

  if (isError) {
    return <div>Error loading the dashboard data</div>;  // Handle error state
  }

  console.log("maryam", data);  // Log the data for debugging

  return (
    <div className="flex-1 space-y-8 p-8">
      <DashboardHeader onTimePeriodChange={handleTimePeriodChange} />
      <DashboardStats data={data}/>
      <div className="grid gap-8 md:grid-cols-2">
        <FarmerRegistrationChart data={data}/>
        <RegionalMap data={data} />
      </div>
      <NewFarmersTable data={data} />
    </div>
  );
}

