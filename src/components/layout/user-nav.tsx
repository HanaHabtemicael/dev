"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            {/* username */}

            <span className=" text-sm font-medium leading-none text-muted-foreground capitalize">
            {session.user?.name}
            </span>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full focus-visible:ring-primary/60"
            >
              <Avatar className="h-10 w-10 bg-primary">
                {/* <AvatarImage
                  // src={session.user?.name ?? ""}
                  src={"/assets/images/temp_user.png"}
                  alt={session.user?.name ?? ""}
                /> */}
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              {/* <p className="text-xs leading-none text-muted-foreground">
                {session.user?.name}
              </p> */}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/dashboard/setting/Profile`);
              }}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
