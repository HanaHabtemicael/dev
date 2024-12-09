"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/farmers/Breadcrumb";
import { PersonalDetails } from "@/components/farmers/FarmerDetail/PersonalDetails";
import { LocationInfo } from "@/components/farmers/FarmerDetail/LocationInfo";
import { FarmlandInfo } from "@/components/farmers/FarmerDetail/FarmlandInfo";
import { AgentCard } from "@/components/farmers/AgentCard";
import { Sidebar } from "@/components/farmers/FarmerDetail/Sidebar";
import { FarmerDetailSidebar } from "./FarmerDetailInformationSidebar";

export function FarmerDetailInformation() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className=" mx-2 py-6 ">
      <div className="space-y-6">
        <AgentCard />
        <div>
          <div className="grid h-fit md:grid-cols-[300px,1fr] gap-6 mt-3">
            <FarmerDetailSidebar
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
              }}
            />

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start">
                <TabsTrigger value="personal">General Information</TabsTrigger>
                <TabsTrigger value="location">Social Status</TabsTrigger>
                <TabsTrigger value="farmland">Agronomy Data</TabsTrigger>
                <TabsTrigger value="farmland">Income Expense</TabsTrigger>
                <TabsTrigger value="farmland">Livestock Income</TabsTrigger>
                <TabsTrigger value="farmland">Creadit History</TabsTrigger>
                <TabsTrigger value="farmland">Basic Information</TabsTrigger>
                <TabsTrigger value="farmland">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <PersonalDetails />
              </TabsContent>
              <TabsContent value="location">
                <LocationInfo />
              </TabsContent>
              <TabsContent value="farmland">
                <FarmlandInfo />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
