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

export function FarmerDetailTab() {
  const [activeTab, setActiveTab] = useState("farmerInformation");

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
          <FarmerDetails />
        </TabsContent>
        <TabsContent value="farmerDetailInformation">
           <FarmerinformationDetails />
        </TabsContent>
      </Tabs>
    </div>
  );
}
