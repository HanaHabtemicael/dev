"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
import { ChevronDown, Plus, SearchIcon, Dot } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useGetPermission } from "@/hooks/usePermission";
import { useSession } from "next-auth/react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Permission() {
  const router = useRouter();
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: roles, isLoading, isError, refetch } = useGetPermission();
  console.log("per", roles);
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      description: string;
      resource: string;
    }[]
  >([]);

  useEffect(() => {
    refetch();
  }, [limit, page, searchQuery, refetch]);

  useEffect(() => {
    if (roles) {
      const groupedRoles = Object.keys(roles).reduce((acc, resourceKey) => {
        const descriptions = roles[resourceKey]
          .map((role: any) => role.description)
          .join(", "); // Combine descriptions into one string
        acc.push({
          resource: resourceKey,
          description: descriptions,
        });
        return acc;
      }, []);
      setData(groupedRoles);
    }
  }, [roles]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => null, // Remove the select checkbox column if not needed
        cell: () => null,
      },
      {
        id: "resource",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <CaretSortIcon className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="capitalize">{row.original.resource}</span>
        ),
      },
      {
        id: "description",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descriptions
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div className="flex flex-row-2 ">
            {/* Loop through descriptions */}
            {row.original.description
              .split(", ")
              .map((desc: string, index: number) => (
                <div key={index} className="flex items-center ">
                  {/* Dot icon */}

                  <Dot size={36} color="#33d17a" />
                  <span>{desc}</span>
                </div>
              ))}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  if (isError) {
    return <div>Error loading roles. Please try again.</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="flex justify-end mr-4 mt-10">
        <Button className="px-10">
          <Plus className="mr-2 h-4 w-4" />
          Add New Role
        </Button>
      </div>
      <div className="bg-white shadow-md rounded-md mx-4 mt-4">
        <div className="pt-5">
          <h1 className="pl-2 mt-2 text-2xl text-primaryText font-bold">
            Permissions
          </h1>
        </div>
        <div className="mx-2 mt-2">
          <div className="flex items-center space-x-2 pb-4">
            <Input
              type="text"
              placeholder="Search for a role"
              className="w-full"
              value={searchQuery}
              onChange={handleSearch}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <ScrollArea>
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
