"use client";
import React, { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { navItems, sidebarNavItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { NavItem } from "@/types";
import { filterMenu } from "@/utils/filter-menus";
import SidebarSection from "./sidebar-section";
import { Spinner } from "../ui/spinner";
import { ScrollArea } from "../ui/scroll-area";
import SidebarSkeleton from "../skeleton/sidebarSkeleton";

type SidebarProps = {
  className?: string;
  isMinimized?: boolean;
  status?: boolean;
};

export default function Sidebar({
  className,
  isMinimized,
  status,
}: SidebarProps) {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <nav
      className={cn(
        `fixed  top-0 left-0 hidden h-screen flex-none border-r z-10 lg:block overflow-hidden bg-[#242745]`,
        // `hidden max-h-screen flex-none border-r z-10 lg:block overflow-hidden bg-[#242745]`,
        status && "duration-500",
        isMinimized ? "lg:w-0 w-64" : "w-64",
        className
      )}
    >
      <ScrollArea className="h-full w-full rounded-md ">
        <div className="flex flex-row justify-center h-21 mb-3">
        <Image
          src="/assets/logo/lersha_logo_white.png"
          alt={"img"}
          width="94"
          height="194"
          className="p-2"
          style={{
            objectFit: "contain",
            overflow: "hidden",
          }}
        />
      </div>
        {/* <div className="bg-gray-200 h-[1px] w-full"></div> */}
<hr/>
        {sessionStatus != "authenticated" ? (
          <div className="flex items-center justify-center h-full flex-1">
            {/* <Spinner size="large" /> */}
            <SidebarSkeleton />
          </div>
        ) : (
          <div className="space-y-1">
            {sidebarNavItems.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <SidebarSection
                    sectionTitle={item.section}
                    menus={filterMenu(item.menuItems, session?.user.role)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </nav>
  );
}
