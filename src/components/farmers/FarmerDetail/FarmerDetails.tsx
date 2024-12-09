"use client";

import { useState } from "react";
import { AgentCard } from "@/components/farmers/AgentCard";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";

export function FarmerDetails() {
  const [activeTab, setActiveTab] = useState("personal"); // Track active tab

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalDetails />;
      case "location":
        return <LocationInfo />;
      case "farmland":
        return <FarmlandInfo />;
      default:
        return <PersonalDetails />;
    }
  };

  return (
    <div className="mx-2 py-6">
      <div className="space-y-6">
        <AgentCard />
        <div className="grid bg-white h-fit md:grid-cols-[300px,1fr] gap-6 mt-3">
          {/* Sidebar, passing activeTab and onTabChange */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="w-full">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
