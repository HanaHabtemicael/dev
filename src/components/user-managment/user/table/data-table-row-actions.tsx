"use client"

import { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Eye className="h-4 w-4 text-gray-500" 
        onClick={() =>
                  router.push('/dashboard/farmer/1')
                }/>
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Pencil className="h-4 w-4 text-blue-500" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  )
}