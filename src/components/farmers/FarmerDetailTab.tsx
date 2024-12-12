"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/farmers/Breadcrumb";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";
import { AgentCard } from "@/components/farmers/AgentCard";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { FarmerDetails } from "./FarmerDetail/FarmerDetails";
import { FarmerDetailInformation } from "./FarmerDetailInformatiom/FarmerDetailInformation";
import { FarmerinformationDetails } from "./FarmerDetailInformatiom/FarmerDetailInformationTap";
import { useFarmerDetail } from "@/hooks/useFarmer";



export function FarmerDetailTab({ farmerId }: { farmerId: string }) {
  const [activeTab, setActiveTab] = useState("farmerInformation");
  const {
    data: farmer,
    isLoading,
    error,
    isError,
    isSuccess,
    refetch,
  } = useFarmerDetail(farmerId );
  console.log("fd",farmer)


  return (
    <div className=" mx-6 py-1 ">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="farmerInformation">
            Farmer Information
          </TabsTrigger>
          <TabsTrigger value="farmerDetailInformation">
            Farmer Detail Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="farmerInformation">
          <FarmerDetails farmerData={farmer}/>
        </TabsContent>
        <TabsContent value="farmerDetailInformation">
           <FarmerinformationDetails farmerData={farmer} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
