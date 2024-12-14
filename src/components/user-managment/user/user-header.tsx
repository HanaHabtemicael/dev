"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";

export function UserHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search (Ctrl+/)" 
          className="pl-10 w-[300px]"
        />
      </div>
      <div className="flex items-center gap-4">
        <Button variant="default" className="bg-[#22A958] hover:bg-[#1e9b4f]">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add New User
        </Button>
      </div>
    </div>
  );
}