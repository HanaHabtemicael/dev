import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <div className="px-3 py-2 mt-3 w-full flex-1">
      <div className="space-y-3 flex flex-col w-full">
        <Skeleton className="h-3 w-1/2 bg-primary/60" />
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
        <Skeleton className="h-8 w-full bg-primary/60 flex items-center">
          <Skeleton className="h-6 w-6 ml-2 bg-white/40 rounded" />
        </Skeleton>
      </div>
    </div>
  );
}
