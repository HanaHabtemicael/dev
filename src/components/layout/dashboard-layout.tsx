"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useGetUser } from "@/hooks/useUser";

export default function DashboardLayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const { data: user, isLoading, isError, isSuccess } = useGetUser();

  console.log("user", user);
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#F8F9FB] pb-4">
      <Header
        isMinimized={isMinimized}
        togglecollapse={toggle}
        setStatus={setStatus}
        loading={isLoading || isError || !isSuccess}
          role={user?.role?.name}
      />
      
      <div
        className={cn("flex-1 max-w-full mt-14 flex", status && "duration-500")}
      >
        <Sidebar
          isMinimized={isMinimized}
          status={status}
          loading={isLoading || isError || !isSuccess}
          role={user?.role?.name}
        />
        <main
          className={cn(
            "w-full overflow-x-hidden h-full",
            status && "duration-500",
            !isMinimized ? "lg:ml-64 ml-0" : "ml-0"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
