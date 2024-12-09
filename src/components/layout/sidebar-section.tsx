"use client";
import React, { useEffect, useState } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { NavItem } from "@/types";
import { filterMenu } from "@/utils/filter-menus";

type SidebarProps = {
  sectionTitle: string;
  menus: NavItem[];
};

export default function SidebarSection({ sectionTitle, menus }: SidebarProps) {
  return (
    <div className="space-y-4">
      <div className="px-3 py-2 ">
        <div className="mt-3 flex flex-col space-y-2">
          {sectionTitle.trim() !== "" && (
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider">
             
            </span>
          )}
          <DashboardNav items={menus} />
        </div>
      </div>
    </div>
  );
}