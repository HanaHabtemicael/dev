//import FarmerRegistrationTabs from "@/components/farmer/FarmerRegistrationTabs";
"use client";
import React from "react";
//import FarmerRegistrationForm from "../../../../components/farmer/farmerRegistrationForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import Permission from "@/components/user-managment/permission";
import RoleList from "@/components/user-managment/Role";


const Page: React.FC = () => {
  return (
    <ScrollArea className="h-full   ">
      <div className="text-black ">
        <RoleList />
        </div>
   </ScrollArea> 
  );
};

export default Page;
