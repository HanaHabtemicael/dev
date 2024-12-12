"use client";

import { FarmerDetailLayout } from "@/components/farmers/FarmerDetailLayout";
import { FarmerDetailSidebar } from "./FarmerDetailInformationSidebar";
import { GeneralInformation } from "./GeneralInformation";
import { AgronomyData } from "./AgronomyData";
import { SocialStatus } from "./SocialStatus";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";
import { IncomeExpense } from "./IncomeExpense";
import { LivestockIncome } from "./LivestockIncome";
import { CreaditHistory } from "./CreaditHistory";

export function FarmerinformationDetails({ farmerData }: { farmerData: any }) {
  // Sidebar tab names
  const sidebarTabs = [
    "general",
    "social",
    "agronomy",
    "farmLand",
    "incomeExpense",
    "livestockIncome",
    "creaditHistory",
    "BasicInformation",
    "Documents",
  ];

  // Map of tab content
  const contentMap = {
    general: <GeneralInformation farmerData={farmerData} />,
    social: <SocialStatus farmerData={farmerData} />,
    agronomy: <AgronomyData farmerData={farmerData} />,
    farmLand: <FarmlandInfo farmerData={farmerData} />,
    incomeExpense: <IncomeExpense farmerData={farmerData} />,
    livestockIncome: <LivestockIncome farmerData={farmerData} />,
    creaditHistory: <CreaditHistory farmerData={farmerData} />,
    BasicInformation: <AgronomyData farmerData={farmerData} />,
    Documents: <AgronomyData farmerData={farmerData} />,
  };

  return (
    <FarmerDetailLayout
      farmerData={farmerData}
      sidebarComponent={FarmerDetailSidebar}
      sidebarTabs={sidebarTabs}
      contentMap={contentMap}
    />
  );
}
