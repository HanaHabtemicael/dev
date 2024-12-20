import { Icons } from "@/components/icons";
import { ReactNode } from "react";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  subMenu: NavItem[];
  role: string[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}


export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface Metric {
  id: string;
  title: string;
  value: number;
  icon: ReactNode;
}

export interface ContractData {
  month: string;
  Completed: number;
  Terminated: number;
  InProgress: number;
}
export type PermissionType = {
  id: number;
  name: string;
  content_type: string;
  code_name: string;
};

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;
