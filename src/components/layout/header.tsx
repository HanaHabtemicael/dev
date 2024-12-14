"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
export default function Header() {
  const { data: session, status: sessionStatus } = useSession();

  return (
    <header className="fixed top-0 right-0 left-60 h-16 bg-white border-b flex items-center px-6 gap-4">
      <div className="flex-1">
        <Input placeholder="Search something here" className="max-w-md" />
      </div>

      <div className="flex items-center gap-4 ">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-black" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">
            4
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Image
                src="/assets/logo/picture.png"
                alt="imag"
                width={32}
                height={32}
              />

              <div className="text-sm text-right">
                <div className="text-black">{session?.user.role}</div>
                <div className="text-muted-foreground text-xs text-slate-800">
                  {session?.user.email}
                </div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
