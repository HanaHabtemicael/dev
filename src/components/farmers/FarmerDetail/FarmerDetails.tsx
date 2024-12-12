"use client";

import { FarmerDetailLayout } from "@/components/farmers/FarmerDetailLayout";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";

export function FarmerDetails({ farmerData }: { farmerData: any }) {
  // Sidebar tab names
  const sidebarTabs = ["personal", "location", "farmland"];

  // Map of tab content
  const contentMap = {
    personal: <PersonalDetails farmerData={farmerData} />,
    location: <LocationInfo farmerData={farmerData} />,
    farmland: <FarmlandInfo farmerData={farmerData} />
  };

  return (
    <FarmerDetailLayout 
      farmerData={farmerData} 
      sidebarComponent={Sidebar} 
      sidebarTabs={sidebarTabs} 
      contentMap={contentMap} 
    />
  );
}
