"use client";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  return (
    <div className="space-y-4 flex flex-row justify-between">
      <div>
        <h1 className="text-3xl font-bold text-green-700">DC Dashboard</h1>
        <p className="text-primaryText">
          Hello! Here you can manage your data collection seamlessly and access detailed insights.
        </p>
      </div>
      <div className="inline-flex rounded-lg border p-1">
        <Button variant="default" className="bg-green-600  hover:bg-green-700">
          This Week
        </Button>
        <Button className="text-primaryText" variant="ghost">This Month</Button>
        <Button className="text-primaryText" variant="ghost">This Year</Button>
      </div>
    </div>
  );
}