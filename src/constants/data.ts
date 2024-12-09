import { NavItem } from "@/types"

export const reportNavItems: NavItem[] = [
  {
    title: "Calendar",
    href: "/calendar",
    icon: "dashboard",
    label: "Dashboard",
    role: ["super_admin","admin","manager","field_agent"],
    subMenu: [],
  },
];
export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
    role: ["super_admin","admin","manager","field_agent"],
    subMenu: [],
  },
  {
    title: "Farmers",
    href: "/dashboard/farmer",
    icon: "user",
    label: "user",
    role: ["super_admin","admin","manager","field_agent"],
    subMenu: [],
  },
  
  // {
  //   title: "Setting",
  //   href: "/dashboard/setting/ManageUser",
  //   icon: "settings",
  //   label: "Setting",
  //   role: ["super_admin","admin","manager","field_agent"],
  //   subMenu: [
  //     {
  //       title: "Profile",
  //       href: "/dashboard/setting/ManageUser",
  //       role: ["super_admin", "admin", "manager","field_agent"],
  //       subMenu: []
  //     }
  //   ],

  // },
];

export const sidebarNavItems: any = [
  {
    section: "Dashboard",
    menuItems: navItems,
  },
  // {
  //   section: "Reports",
  //   menuItems: reportNavItems,
  // },
];
