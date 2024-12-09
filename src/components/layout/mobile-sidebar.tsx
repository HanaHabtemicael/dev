"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navItems, sidebarNavItems } from "@/constants/data";
import { NavItem } from "@/types";
import { filterMenu } from "@/utils/filter-menus";
import { MenuIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SidebarSection from "./sidebar-section";
import SidebarSkeleton from "../skeleton/sidebarSkeleton";
import { ScrollArea } from "../ui/scroll-area";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
  loading?: boolean;
  role?: string;
}

export function MobileSidebar({ className, loading, role }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [filteredNavMenuItems, setFilteredNavMenuItems] = useState<NavItem[]>(
    []
  );

  useEffect(() => {
    return () => {
      if (session) {
        setFilteredNavMenuItems(filterMenu(navItems, session.user.role));
      }
    };
  }, [session]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="!px-0 bg-background border-0 w-64 overflow-y-auto"
        >
          {/* <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider">
                Overview
              </span>
              <div className="space-y-1">
                <DashboardNav items={filteredNavMenuItems} />
              </div>
            </div>
          </div> */}
          <ScrollArea className="h-full w-full rounded-md ">
            {/* <div className="flex flex-row justify-center h-20 bg-primary">
        <Image
          src="/assets/logo/lersha_logo_white.png"
          alt={"img"}
          width="94"
          height="94"
          className="p-2"
          style={{
            objectFit: "contain",
            overflow: "hidden",
          }}
        />
      </div> */}
            {/* <div className="bg-gray-200 h-[1px] w-full"></div> */}

            {/* {sessionStatus != "authenticated" ? ( */}
            {loading && !role ? (
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
                        menus={filterMenu(item.menuItems, role)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
