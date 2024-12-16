"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, User, Trees ,Users,BookOpen,FileChartColumnIncreasing,FileBadge ,ChartNoAxesCombined,LandPlot,CircleDollarSign  } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  farmerData:any;
}

export function FarmerDetailSidebar({ farmerData,activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="space-y-4 h-full">
      <Card className="p-4 text-center">
        <div className="flex justify-center w-full mb-4">
          <Image src="/assets/images/images.png" alt="imag" width={100} height={100} />
        </div>
        <h2 className="text-xl font-semibold text-primary">{farmerData?.first_name} {farmerData?.middle_name} {farmerData?.last_name}</h2>
        <hr />
        <nav className="space-y-2 mt-3 pb-16">
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "general"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("general")}
          >
            <User className="w-4 h-4" />
            <span>General Information</span>
          </button>
          
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "agronomy"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("agronomy")}
          >
            <BookOpen className="w-4 h-4" />
            <span>Agronomy Data</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "farmLand"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("farmLand")}
          >
            <LandPlot className="w-4 h-4" />
            <span>Farm Land</span>
          </button>

          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "incomeExpense"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("incomeExpense")}
          >
            <CircleDollarSign  className="w-4 h-4" />
            <span>Income Expense</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "livestockIncome"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("livestockIncome")}
          >
            <CircleDollarSign className="w-4 h-4" />
            <span>Livestock Income</span>
          </button>
          
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "creaditHistory"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("creaditHistory")}
          >
            <ChartNoAxesCombined  className="w-4 h-4" />
            <span>Creadit History</span>
          </button>
          {/* <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <FileBadge className="w-4 h-4" />
            <span>Basic Information</span>
          </button>

          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <FileChartColumnIncreasing  className="w-4 h-4" />
            <span>Documents </span>
          </button> */}
        </nav>
      </Card>
    </div>
  );
}
