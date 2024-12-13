//import FarmerRegistrationTabs from "@/components/farmer/FarmerRegistrationTabs";
"use client";
import React from "react";
//import FarmerRegistrationForm from "../../../../components/farmer/farmerRegistrationForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import FarmerList from "@/components/farmers/farmerList";
import UserList from "@/components/user-managment/userList";


const Page: React.FC = () => {
  return (
    <ScrollArea className="h-full   ">
      <div className="text-black ">
        <UserList />
        </div>
   </ScrollArea> 
  );
};

export default Page;
