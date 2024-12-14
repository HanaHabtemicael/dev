"use client";
import React, { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import DashboardNavItem from "./dashboard-nav-item";
import { Icons } from "./icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";

export default function DashboardNavDropdownItem({
  item,
  path,
  Icon,
}: {
  item: NavItem;
  path: string;
  Icon: any;
}) {
  const router = useRouter();
  const [collapse, setcollapse] = useState(true);
  return (
    <div>
      <div
        className={cn(
          "flex items-center w-full justify-between overflow-hiddentext-sm font-medium text-foreground hover:bg-accent transition-all duration-200 rounded-md ease-in-out hover:bg-primary",

          path === item.href ? "bg-primary" : "transparent",
          collapse &&
            path != item.href &&
            item.subMenu.map((menu) => menu.href).includes(path) &&
            "bg-primary mt-2",

          item.disabled && "cursor-not-allowed opacity-80"
        )}
      >
        <div
          onClick={() => {
            if (item.href) {
              router.push(item.href);
            } else {
              setcollapse(!collapse);
            }
          }}
          className="flex items-center gap-2 py-2 mt-2 flex-1 hover:bg-primary"
        >
          <Icon className={`ml-3 size-5 text-white `} />
          <span className="mr-2 truncate text-white ">{item.title}</span>
        </div>
        <div className="pr-4" onClick={() => setcollapse(!collapse)}>
          <Icons.ChevronDown
            className={cn(
              ` duration-300 transition-all text-white hover:bg-primary`,
              collapse ? "transform rotate-0" : "transform rotate-180"
            )}
          />
        </div>
      </div>
      <div
        className={cn(
          "transition-all overflow-hidden duration-500 ease rounded-b-md text-white ",
          collapse ? " max-h-0" : "max-h-96"
        )}
      >
        {item.subMenu.map((submenuItem, index) => {
          const SubmenuIcon = Icons[submenuItem.icon || "arrowRight"];
          return (
            <DashboardNavItem
              key={index}
              item={submenuItem}
              path={path}
              Icon={SubmenuIcon}
              submenu={true}
            />
          );
        })}
      </div>
    </div>
  );
}
