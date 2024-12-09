"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import DashboardNavItem from "./dashboard-nav-item";
import DashboardNavDropdownItem from "./dashboard-nav-dropdown-item";

interface DashboardNavProps {
  items: NavItem[];
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {items.map((item, index) => {
          const Icon = Icons[item.icon || "arrowRight"];
          if (item.subMenu.length > 0) {
            return (
              <DashboardNavDropdownItem
                key={index}
                item={item}
                path={path}
                Icon={Icon}
                
              />
            );
          }
          return (
            <DashboardNavItem key={index} item={item} path={path} Icon={Icon} />
          );
        })}
      </TooltipProvider>
    </nav>
  );
}
