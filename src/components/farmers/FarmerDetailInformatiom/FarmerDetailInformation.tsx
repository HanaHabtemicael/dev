"use client";

import { useState } from "react";
import { FarmerDetailLayout } from "@/components/farmers/FarmerDetailLayout";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { AgronomyData } from "./AgronomyData";
import { AgentCard } from "@/components/farmers/AgentCard";
import { FarmerDetailSidebar } from "./FarmerDetailInformationSidebar";

export function FarmerDetailInformation({ farmerData }: { farmerData: any }) {
  const [activeTab, setActiveTab] = useState("general");

  const sidebarTabs = [
    "general",
    "location",
    "agronomy",
    "incomeExpense",
    "livestockIncome",
    "creditHistory",
    "basicInformation",
    "documents",
  ];

  const contentMap = {
    general: <PersonalDetails farmerData={farmerData} />,
    location: <LocationInfo farmerData={farmerData} />,
    agronomy: <AgronomyData farmerData={farmerData} />,
    incomeExpense: <AgronomyData farmerData={farmerData} />,
    livestockIncome: <AgronomyData farmerData={farmerData} />, 
    creditHistory: <AgronomyData farmerData={farmerData} />,
    basicInformation: <AgronomyData farmerData={farmerData} />, 
    documents: <AgronomyData farmerData={farmerData} />,
  };

  return (
    <div className="mx-2 py-6">
      <div className="space-y-6">
        <AgentCard />
        <div>
          <div className="grid h-fit md:grid-cols-[300px,1fr] gap-6 mt-3">
            <FarmerDetailSidebar
              activeTab={activeTab}
              onTabChange={(tab) => setActiveTab(tab)}
            />
            <FarmerDetailLayout
              farmerData={farmerData}
              sidebarComponent={Sidebar}
              sidebarTabs={sidebarTabs}
              contentMap={contentMap}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
