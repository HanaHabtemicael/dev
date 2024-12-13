"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Farmer, useGetAllFarmers } from "@/hooks/useFarmer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronDown, Plus, SearchIcon } from "lucide-react";
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
import { Eye } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CaretSortIcon } from "@radix-ui/react-icons";
import AddNewUser from "./NewUser";
import { useEmployeeActivation, useGetEmployee } from "@/hooks/useEmployee";
import { useToast } from "../ui/use-toast";
// import DetailUser from "./DetailUser";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function UserList() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  //const [debouncedSearchQuery] = useDebounce(searchQuery, 300); // Debounce search query
  // const [searchLoading, setSearchLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  // const [openDetail, setOpenDetail] = useState(false);
  const [detailEmployeeId, setDetailEmployeeId] = useState(null);
  const { toast } = useToast();

  const {
    data: employees,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useGetEmployee(page, limit, searchQuery);

  const { mutate: changeEmployeeStatus, isPending } = useEmployeeActivation();

  useEffect(() => {
    refetch();
  }, [limit, page, searchQuery, refetch, employees]);

  const [data, setData] = useState<
    {
      id: string;
      username: string;
      first_name: string;
      last_name: string;
      phone: string;
      email: string;
      role: any;
      is_active: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (employees && isSuccess) {
      setData(
        employees?.data?.map((employee: any) => ({
          id: employee.id,
          username: employee.username,
          first_name: employee.first_name,
          last_name: employee.last_name,
          phone: employee.phone_number,
          email: employee.email,
          role: employee.role,
          is_active: employee.is_active,
        }))
      );
    }
  }, [isSuccess, employees]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'photo_url',
        header: '',
        cell: ({ row }) => {
          return (
            <div className="relative aspect-square">
              {/* <Image
                src={row.getValue('photo_url')}
                alt={row.getValue('name')}
                fill
                className="rounded-lg"
              /> */}
              <Avatar className="h-10 w-10 bg-primary">
                {/* <AvatarImage
                  // src={session.user?.name ?? ""}
                  src={"/assets/images/temp_user.png"}
                  alt={session.user?.name ?? ""}
                /> */}
                <AvatarFallback  className="bg-primary text-white text-md font-semibold">{row.original.username?.[0]}</AvatarFallback>
              </Avatar>
            </div>
          );
        }
      },
      {
        id: "username",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Username
            <CaretSortIcon className="h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) =>
          <span className="capitalize whitespace-nowrap">
          {row.original.username ?? ""}
          </span>
      },
      {
        id: "fullname",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fullname
            {/* <CaretSortIcon className="h-4 w-4" /> */}
          </Button>
        ),
        cell: ({ row }) =>
          <span className="capitalize whitespace-nowrap">
          {`${row.original.first_name ?? ""} ${row.original.last_name ?? ""}`}
          </span>
      },
      {
        id: "phone",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => `${row.original.phone ?? ""}`,
      },
      {
        id: "emali",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => `${row.original.email ?? ""}`,
      },
      {
        id: "role",
        // accessorKey: "MembershipStatus",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => 
          <span className="capitalize whitespace-nowrap">
          {`${row.original.role.name}`}
          </span>
      },
      {
        id: "Actions",
        header: "Actions",
        cell: function ActionCell({ row }) {
          return (
            <div className="flex items-center justify-start space-x-2">
              <Eye
                size={22}
                className="text-primary"
                strokeWidth={1.5}
                onClick={
                  () => {
                    setOpenDetail(true);
                    setDetailEmployeeId(row.original.id);
                  }
                  // router.push(`/dashboard/farmer/${row.original.id}`)
                }
              />
              <Button
                onClick={() => {
                  changeEmployeeStatus(row.original.id, {
                    onSuccess: () => {
                      refetch();
                      toast({
                        style: {
                          backgroundColor: "#16a34a",
                          color: "#fff",
                          padding: ".5rem",
                        },
                        description: "Employee Status Changed Successfully.",
                      });
                      refetch();
                    },
                    onError: () => {
                      toast({
                        variant: "destructive",
                        style: {
                          padding: ".5rem",
                        },
                        description: "Something went wrong. Try again.",
                      });
                    },
                  });
                }}
                variant={row.original.is_active ? "default" : "destructive"}
                className="p-0 h-min rounded-full px-4 py-1"
              >
                {row.original.is_active ? "Active" : "Inactive"}
              </Button>
            </div>
          );
        },
      },
    ],
    [employees]
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
  const handleAddFarmerNavigation = () => {
    setOpen(true);
  };

  return (
    <ScrollArea>
      <div>
        <div className="flex justify-end mr-4 mt-10">
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
                  placeholder="Search user "
                  className="w-full"
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>

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
                  {(isLoading || isRefetching) && !employees ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <Spinner />
                      </TableCell>
                    </TableRow>
                  ) : isError ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Something went wrong. try again
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={`cursor-pointer text-[#4B465C] hover:bg-gray-200 ${
                          row.getIsSelected() ? "bg-primary/10" : ""
                        }`}
                        onClick={() => row.toggleSelected()}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="text-left">
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
            <div className="flex items-center justify-between space-x-2 py-4">
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
                      <SelectItem value={"25"}>25</SelectItem>
                      {/* 
                    <SelectItem value={"50"}>50</SelectItem>
                    <SelectItem value={"100"}>100</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* <PaginationComponent
                currentPage={page}
                totalPages={employees?.metadata.pagination.numberOfPages}
                setPage={setPage}
              /> */}
              {open && <AddNewUser open={open} setOpen={setOpen} />}
             
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
















































































































