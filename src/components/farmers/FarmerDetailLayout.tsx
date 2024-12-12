"use client";

import { useState } from "react";
import { AgentCard } from "@/components/farmers/AgentCard";
import { Card } from "@/components/ui/card";

export function FarmerDetailLayout({ 
  farmerData, 
  sidebarComponent: Sidebar, 
  sidebarTabs, 
  contentMap 
}: { 
  farmerData: any, 
  sidebarComponent: React.FC<any>, 
  sidebarTabs: string[], 
  contentMap: { [key: string]: React.ReactNode } 
}) {
  const [activeTab, setActiveTab] = useState(sidebarTabs[0]); 

  const renderTabContent = () => contentMap[activeTab] || null;

  return (
    <div className="mx-2 py-6">
      <div className="space-y-6">
        <AgentCard />
        <Card className="grid bg-white h-fit md:grid-cols-[300px,1fr] gap-6 mt-3">
          {/* Sidebar, passing activeTab and onTabChange */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="w-full">{renderTabContent()}</div>
        </Card>
      </div>
    </div>
  );
}
