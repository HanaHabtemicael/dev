import { NavItem } from "@/types";

export function filterMenu(menu: NavItem[], role: string): NavItem[] {
  return menu.filter((item) => {
    if (item.role.includes(role)) {
      if (item.href == "" && item.subMenu.length === 0) {
        return false;
      } else if (item.subMenu.length > 0) {
        item.subMenu = filterSubMenus(item.subMenu, role);
        if (item.href == "" && item.subMenu.length === 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  });
}

function filterSubMenus(menu: NavItem[], role: string): NavItem[] {
  return menu.filter((item) => {
    if (item.role.includes(role) && item.href != "") {
      return true;
    }
    return false;
  });
}
