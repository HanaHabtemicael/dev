"use client";

import { HomeIcon } from "lucide-react";
import Link from "next/link";

export function UserBreadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      <HomeIcon className="w-4 h-4" />
      <Link href="/dashboard" className="hover:text-primary">
        Dashboard
      </Link>
      <span>/</span>
      <span className="text-primary">Manage User</span>
    </div>
  );
}