"use client";

import { useState } from "react";
import { FarmerDetailLayout } from "@/components/farmers/FarmerDetailLayout";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";
import { useUpdateFarmer } from "@/hooks/useFarmer";

export function FarmerDetails({ farmerData }: { farmerData: any }) {
  const [activeTab, setActiveTab] = useState("personal");
  const { mutate: updateFarmer, isError, isSuccess } = useUpdateFarmer();

  

  const sidebarTabs = ["personal", "location", "farmland"];
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
    activeTab={activeTab}
    onTabChange={setActiveTab} 
  />
  );
}
