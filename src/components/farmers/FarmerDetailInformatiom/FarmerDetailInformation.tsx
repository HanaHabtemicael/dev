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
import { AgronomyData } from "./AgronomyData";

export function FarmerDetailInformation({ farmerData }: { farmerData: any }) {
  const [activeTab, setActiveTab] = useState("general");

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
                <TabsTrigger value="general">General Information</TabsTrigger>
                <TabsTrigger value="location">Social Status</TabsTrigger>
                <TabsTrigger value="agronomy">Agronomy Data</TabsTrigger>
                <TabsTrigger value="incomeExpense">Income Expense</TabsTrigger>
                <TabsTrigger value="livestockIncome">Livestock Income</TabsTrigger>
                <TabsTrigger value="creaditHistory">Creadit History</TabsTrigger>
                <TabsTrigger value="basicInformation">Basic Information</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="personal">
                <PersonalDetails />
              </TabsContent>
              <TabsContent value="location">
                <LocationInfo />
              </TabsContent>
              <TabsContent value="agronomy">
                <AgronomyData />
              </TabsContent>
              <TabsContent value="incomeExpense">
                <AgronomyData />
              </TabsContent>
              <TabsContent value="agronomy">
                <AgronomyData />
              </TabsContent>
              <TabsContent value="agronomy">
                <AgronomyData />
              </TabsContent>
              <TabsContent value="agronomy">
                <AgronomyData />
              </TabsContent>
              <TabsContent value="agronomy">
                <AgronomyData />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
