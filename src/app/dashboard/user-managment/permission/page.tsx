//import FarmerRegistrationTabs from "@/components/farmer/FarmerRegistrationTabs";
"use client";
import React from "react";
//import FarmerRegistrationForm from "../../../../components/farmer/farmerRegistrationForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import Permission from "@/components/user-managment/permission";


const Page: React.FC = () => {
  return (
    <ScrollArea className="h-full   ">
      <div className="text-black ">
        <Permission />
        </div>
   </ScrollArea> 
  );
};

export default Page;
