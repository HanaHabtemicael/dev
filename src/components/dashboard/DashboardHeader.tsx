"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DashboardHeader({ onTimePeriodChange }) {
  // Local state to keep track of the selected time period
  const [selectedPeriod, setSelectedPeriod] = useState("year");

  // Handle button click to update the selected time period
  const handleTimePeriodChange = (period) => {
    setSelectedPeriod(period);
    if (onTimePeriodChange) {
      onTimePeriodChange(period);  // Pass the selected time period to the parent component or hook
    }
  };

  return (
    <div className="space-y-4 flex flex-row justify-between">
      <div>
        <h1 className="text-3xl font-bold text-green-700">DC Dashboard</h1>
        <p className="text-primaryText">
          Hello! Here you can manage your data collection seamlessly and access detailed insights.
        </p>
      </div>
      <div className="inline-flex rounded-lg  border-green-600 border p-1">
      <Button
          className={`${selectedPeriod === "year" ? "text-white bg-primary" : "text-primaryText"} hover:bg-primary-light hover:text-white`}
          variant="ghost"
          onClick={() => handleTimePeriodChange("year")}
        >
          This Year
        </Button>
        <Button
          className={`${selectedPeriod === "month" ? "text-white bg-primary" : "text-primaryText"} hover:bg-primary-light hover:text-white`}
          variant="ghost"
          onClick={() => handleTimePeriodChange("month")}
        >
          This Month
        </Button>
        <Button
          className={` ${selectedPeriod === "week" ? "bg-primary text-white" : "text-primaryText"} hover:bg-primary-light hover:text-white` }
          onClick={() => handleTimePeriodChange("week")}
          variant="ghost"
        >
          This Week
        </Button>
        
        
      </div>
    </div>
  );
}
