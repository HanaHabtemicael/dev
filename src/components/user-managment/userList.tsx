"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  useGetFarmer,
  Farmer,
  useGetAllFarmers,
  useGetFarmersForExport,
} from "@/hooks/useFarmer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  ArrowUpFromLine,
  ChevronDown,
  Plus,
  SearchIcon,
  FileX,
} from "lucide-react";
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
import { Eye, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDebounce } from "use-debounce";
import { PaginationComponent } from "@/components/pagination";
import { CSVLink } from "react-csv";
import { Breadcrumb } from "../layout/breadcrumb";
import { useGetUser } from "@/hooks/useUser";
import AddNewUser from "./NewUser";

export default function UserListt() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  //const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // Debounce search query
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    data: farmers,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useGetUser();

  console.log("us", farmers);

  useEffect(() => {
    setSearchLoading(true);
    refetch().finally(() => setSearchLoading(false));
  }, [ farmers]);
  const [open, setOpen] = useState(false);

  const data = useMemo(
    () =>
      farmers?.data.message?.map((farmer: Farmer) => ({
        id: farmer.id,
        FirstName: farmer.firstName,
        LastName: farmer.lastName,
        PhoneNumber: farmer.phoneNumber,
        Email: farmer.email,
        Adress:farmer.address	,
      })) || [],
    [farmers]
  );

  const columns: ColumnDef<Farmer>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            // checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            // checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
          />
        ),
      },

      {
        id: "FullName",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User Name
            <CaretSortIcon className="  h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) =>
          `${row.original.FirstName}  ${row.original.LastName}`,
      },
      {
        accessorKey: "PhoneNumber",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <CaretSortIcon className=" h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "Email",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="h-4 w-4" />
          </Button>
        ),
      },

      // {
      //   id: "Actions",
      //   header: "Actions",
      //   cell: function ActionCell({ row }) {
      //     return (
      //       <div className="flex gap-2">
      //         <Eye
      //           size={26}
      //           className="text-primary"
      //           strokeWidth={1.5}
      //           onClick={() =>
      //             router.push(`/dashboard/farmer/${row.original.id}`)
      //           }
      //         />
      //         <Trash2 size={25} className="text-red-500" strokeWidth={1.5} />
      //       </div>
      //     );
      //   },
      // },
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
    state: {
      //pagination: { pageSize: limit, pageIndex: page - 1 },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  }, []);

  const { data: allFarmers } = useGetAllFarmers(page, limit);
  const columnHeaderMapping: Record<string, string> = {
    FullName: "User Name",
    PhoneNumber: "Phone Number",
    MembershipStatus: "Membership",
  };

  const csvHeaders = useMemo(() => {
    return table
      .getAllColumns()
      .filter(
        (col) =>
          col.getIsVisible() && col.id !== "select" && col.id !== "Actions"
      )
      .map((col) => ({
        label: columnHeaderMapping[col.id] || col.id,
        key: col.id,
      }));
  }, [table]);

  const csvData = useMemo(() => {
    const data = allFarmers?.data || [];
    console.log("nmf", data);
    return (
      data?.map((row: { [x: string]: any; FirstName: any; last_name: any }) => {
        const transformedRow = {};
        csvHeaders.forEach(({ key }) => {
          transformedRow[key] =
            key === "FullName"
              ? `${row.FirstName || ""}  ${row.LastName || ""}`
              : row[key] || "";
        });
        return transformedRow;
      }) || []
    );
  }, [allFarmers, csvHeaders]);

  const handleAddFarmerNavigation = () => {
    setOpen(true);
  };

  return (
    <div>
      <div className="flex justify-start mt-10">
        <div className="flex items-center gap-2 text-primaryText mb-6">
          <Link href="/" className="hover:text-foreground">
            Dashboard
          </Link>
          <span> / </span>
          <Link href="/farmer" className="hover:text-foreground">
            <span className="text-primary font-semibold">Farmers</span>
          </Link>
        </div>
        
      </div>
      <div className="flex justify-end mr-4 mt-5">
          <Button onClick={handleAddFarmerNavigation} className="px-10">
            <Plus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>
      <div className="bg-white shadow-md rounded-md mx-4 mt-4">
        <div className="pt-5 flex flex-row items-baseline">
          <div className="flex justify-between items-center">
            <div>
              {/* <span className="text-xs text-primary">
                List of Not Model Farmers
              </span> */}
              <h1 className="pl-2 mt-2 text-2xl text-primaryText leading-10 font-bold text-small-screen">
                List of users
              </h1>
            </div>
          </div>
          
        </div>

        <div className="mx-2 mt-2">
          <div className="flex items-center space-x-2 pb-4">
            <div className="flex-1">
              <Input
                type="text"
                icon={<SearchIcon className="h-[16px] w-[16px]" />}
                placeholder="Search for lead farmer"
                className="w-full"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                  Columns <ChevronDown className=" h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
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
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-[#4B465C]">
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
                {isLoading || searchLoading || !farmers ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 "
                    >
                      <Spinner />
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 "
                    >
                      Something went wrong. try again
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className={`cursor-pointer text-[#4B465C] hover:bg-gray-200  ${
                        row.getIsSelected() ? "bg-gray-200" : ""
                      }`}
                      onClick={() => row.toggleSelected()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="">
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
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between  py-4">
            <div>
              <Select
                onValueChange={(val) => {
                  setPage(1);
                  setLimit(Number(val));
                }}
                value={limit.toString()}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Result / Page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"5"}>5</SelectItem>
                    <SelectItem value={"10"}>10</SelectItem>
                    {/* <SelectItem value={"25"}>25</SelectItem>
                    <SelectItem value={"50"}>50</SelectItem>
                    <SelectItem value={"100"}>100</SelectItem> */}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <PaginationComponent
              currentPage={page}
              totalPages={farmers?.totalPages}
              setPage={setPage}
            />
            {open && <AddNewUser open={open} setOpen={setOpen} />}
          </div>
        </div>
      </div>
    </div>
  );
}
