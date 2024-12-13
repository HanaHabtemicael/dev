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
    role: ["SuperAdmin","admin","manager","field_agent"],
    subMenu: [],
  },
  {
    title: "Farmers",
    href: "/dashboard/farmer",
    icon: "user",
    label: "user",
    role: ["SuperAdmin","admin","manager","field_agent"],
    subMenu: [],
  },
  {
    title: "User Managment",
    href: "/dashboard/user-managment/permission",
    icon: "users",
    label: "user",
    role: ["SuperAdmin","admin","manager","field_agent"],
    subMenu: [
      {
        title: "Users",
        href: "/dashboard/user-managment/users",
        icon: "circle",
        role: ["SuperAdmin", "admin", "manager","field_agent"],
        subMenu: []
      },
      {
        title: "Permission",
        href: "/dashboard/user-managment/permission",
        icon: "circle",
        role: ["SuperAdmin", "admin", "manager","field_agent"],
        subMenu: []
      },
     
    ],
  },
  
 
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
