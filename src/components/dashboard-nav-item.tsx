"use client";
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

export default function DashboardNavItem({
  item,
  path,
  Icon,
  submenu = false,
}: {
  item: NavItem;
  path: string;
  Icon: any;
  submenu?: boolean;
}) {
  return (
    <Link
      href={item.disabled ? "/" : item.href}
      className={cn(
        "flex items-center gap-2 overflow-hidden text-accent rounded-md py-2 text-sm font-medium transition-colors duration-200 ease-in-out",
        item.href == "/dashboard"
          ? path === item.href
            ? "bg-primary "
            : "transparent hover:bg-primary"
          : // path starts with items.href
            path.startsWith(item.href)
            ? "bg-primary"
            : "transparent hover:bg-primary",
        // path === item.href
        // ? "bg-primary "
        // : "transparent hover:bg-primary",
        item.disabled && "cursor-not-allowed opacity-80 ",
        submenu && "pl-6 "
      )}
    >
      <Icon className={`ml-3 size-5`} />

      <span
        className={`mr-2 truncate text-white ${submenu ? "text-white" : "text-primary"}`}
      >
        {item.title}
      </span>
    </Link>
  );
}
