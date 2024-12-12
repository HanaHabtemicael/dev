"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, User, Trees } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <div className="space-y-4 h-full p-4 text-center w-full">
        <div className="flex justify-center w-full mb-4">
          <Image src="/assets/images/Avatar.png" alt="imag" width={100} height={100} />
        </div>
        <h2 className="text-xl font-semibold text-primary">Abdu Ahmed</h2>
        <hr />
<nav className="space-y-2 mt-3 pb-16">
  <button
    className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
      activeTab === "personal"
        ? "bg-primary/5 text-primary"
        : "hover:bg-primary/5"
    }`}
    onClick={() => onTabChange("personal")}
  >
    <User
      className={`w-4 h-4 ${
        activeTab === "personal" ? "text-primary" : "text-primaryText"
      }`}
    />
    <span
      className={`${
        activeTab === "personal" ? "text-primary font-bold" : "text-primaryText"
      }`}
    >
      Personal Details
    </span>
  </button>


          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "location"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("location")}
          >
            <MapPin className={`w-4 h-4 ${
        activeTab === "location" ? "text-primary" : "text-primaryText"
      }`} />
            <span  className={`${
        activeTab === "location" ? "text-primary font-bold" : "text-primaryText"
      }`}>Location Information</span>
          </button>
          <button
            className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
              activeTab === "farmland"
                ? "bg-primary/5 text-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => onTabChange("farmland")}
          >
            <Trees className={`w-4 h-4 ${
        activeTab === "farmland" ? "text-primary" : "text-primaryText"
      }`} />
            <span  className={`${
        activeTab === "farmland" ? "text-primary font-bold" : "text-primaryText"
      }`}>Farm Land Information</span>
          </button>
        </nav>
    </div>
  );
}
