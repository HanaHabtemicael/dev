"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, User, Trees ,Users,BookOpen,FileChartColumnIncreasing,FileBadge ,ChartNoAxesCombined,LandPlot,CircleDollarSign  } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function FarmerDetailSidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="space-y-4 h-full">
      <Card className="p-4 text-center">
        <div className="flex justify-center w-full mb-4">
          <Image src="/assets/images/Avatar.png" alt="imag" width={100} height={100} />
        </div>
        <h2 className="text-xl font-semibold text-primary">Abdu Ahmed</h2>
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
              activeTab === "social"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("social")}
          >
            <Users  className="w-4 h-4" />
            <span>Social Status</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "farmland"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("farmland")}
          >
            <BookOpen className="w-4 h-4" />
            <span>Agronomy Data</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <LandPlot className="w-4 h-4" />
            <span>Farm Land</span>
          </button>

          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <CircleDollarSign  className="w-4 h-4" />
            <span>Income Expense</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <MapPin className="w-4 h-4" />
            <span>Livestock Income</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <MapPin className="w-4 h-4" />
            <span>Social Status</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <ChartNoAxesCombined  className="w-4 h-4" />
            <span>Creadit History</span>
          </button>
          <button
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
          </button>
        </nav>
      </Card>
    </div>
  );
}