"use client";

import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { MapPin, User, Trees } from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "@/config/index";
import { Progress } from "@/components/ui/progress";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  farmerData: any;
}

export function Sidebar({ farmerData, activeTab, onTabChange }: SidebarProps) {
  const kebeleIdImage = farmerData?.farmerDocuments?.find(
    (doc) => doc.DocumentType === "KEBELEID"
  )?.filePath;
  const percent = farmerData?.profileCompletion.percentage;
  console.log(farmerData?.profileCompletion.percentage);
  return (
    <div className="space-y-4 h-full p-4 text-center w-fit">
      <div className="flex justify-center w-full mb-4">
        {/* {kebeleIdImage ? (
                <Image
                  src={`${BASE_URL}/${kebeleIdImage.replace(/\\/g, "/")}`}
                  alt="Kebele ID"
                  width={300}
                  height={0}
                  className="rounded-md rounded-t-none cursor-pointer"
                  style={{
                    width: "100%",
                    height: "100%", 
                    display: "block",
                    objectFit: "contain",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              ) : (
                <Image
                src="/assets/images/images.png"
                  alt={"img"}
                  width="200"
                  height={0}
                  className="rounded-md rounded-t-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "contain",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              )} */}
        <Image
          src="/assets/images/images.png"
          alt={"img"}
          width="200"
          height={0}
          className="rounded-md rounded-t-none"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            objectFit: "contain",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
      <div className="text-primaryText flex flex-row  align-baseline items-baseline gap-x-4">
        <Progress value={farmerData?.profileCompletion.percentage} />
        {percent}%
      </div>
      <h2 className="text-xl font-semibold text-primary">
        {farmerData?.first_name} {farmerData?.middle_name}{" "}
        {farmerData?.last_name}
      </h2>
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
              activeTab === "personal"
                ? "text-primary font-bold"
                : "text-primaryText"
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
          <MapPin
            className={`w-4 h-4 ${
              activeTab === "location" ? "text-primary" : "text-primaryText"
            }`}
          />
          <span
            className={`${
              activeTab === "location"
                ? "text-primary font-bold"
                : "text-primaryText"
            }`}
          >
            Location Information
          </span>
        </button>
        <button
          className={`w-full flex text-primaryText items-center gap-2 p-2 rounded-lg ${
            activeTab === "farmland"
              ? "bg-primary/5 text-primary"
              : "hover:bg-primary/5"
          }`}
          onClick={() => onTabChange("farmland")}
        >
          <Trees
            className={`w-4 h-4 ${
              activeTab === "farmland" ? "text-primary" : "text-primaryText"
            }`}
          />
          <span
            className={`${
              activeTab === "farmland"
                ? "text-primary font-bold"
                : "text-primaryText"
            }`}
          >
            Farm Land Information
          </span>
        </button>
      </nav>
    </div>
  );
}
