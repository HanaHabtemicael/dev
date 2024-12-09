"use client";

import { useTransition, useState } from "react";
import { Locale } from "@/config/index";
import { setUserLocale } from "@/services/locale";
import {
  CheckIcon,
  CircleCheck,
  Globe,
  LanguagesIcon,
  User,
  CircleCheckBig
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [position, setPosition] = useState("bottom");
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    try {
      startTransition(() => {
        setUserLocale(locale);
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus:ring-0 focus-visible:ring-0 rounded-none"
      >
        <Button variant="ghost" className="text-xs text-[#242745] focus:ring-0">
          <Globe className="mr-2 h-4 w-4 text-[#242745]" />
          {/* English */}
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-24">
        <DropdownMenuLabel className="text-xs">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {items.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => onChange(item.value)}
              className="text-xs flex items-center cursor-pointer"
            >
              {
                <CircleCheckBig
                  className={cn(
                    "mr-2 h-4 w-4 text-primary invisible",
                    item.value === defaultValue && "visible"
                  )}
                  strokeWidth={3}
                />
              }
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
