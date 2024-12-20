"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next-nprogress-bar";
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
import { CaretSortIcon } from "@radix-ui/react-icons";
import AddNewRole from "./AddRole";
import { useGetRole } from "@/hooks/useRole";
import DetailRole from "./RoleDetail";
//import { PaginationComponent } from "../cultivation/farmerVisitReportTable";
import { useSession } from "next-auth/react";
//import { comparePermission } from "@/utils/filter-menus";
//import { ErrorComponent } from "../errorFetching";
//import { LoadingIndicator } from "../loadingIndicaror";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { PaginationComponent } from "@/components/pagination"


export default function RoleList() {
  const router = useRouter();
  const { data: session } = useSession();
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDetail, setOpenDetail] = useState(false);
  const [detailRoleId, setDetailRoleId] = useState(null);

  const {
    data: roles,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isRefetching,
  } = useGetRole();
  console.log("rr",roles)

  useEffect(() => {
    refetch();
  }, [ roles]);
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      description: string;
    }[]
  >([]);

  useEffect(() => {
    if (roles && isSuccess) {
      setData(
        roles?.data?.map((role: any) => ({
          id: role.id,
          name: role.name,
          description: role.description,
        }))
      );
    }
  }, [isSuccess, roles]);

  const columns: ColumnDef<any>[] = useMemo(
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
        id: "role",
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
          <span className="capitalize whitespace-nowrap">
            {`${row.original.name}`}
          </span>
        ),
      },

      {
        id: "description",
        accessorKey: "description",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="capitalize whitespace-nowrap">{`${row.original.description}`}</span>
        ),
      },
      {
        id: "Actions",
        header: "Actions",
        cell: function ActionCell({ row }) {
          return (
            <div className="flex gap-2">
                <Eye
                  size={26}
                  className="text-primary"
                  strokeWidth={1.5}
                  onClick={() => {
                    // router.push(`/dashboard/farmer/${row.original.id}`)
                    setDetailRoleId(row.original.id);
                    setOpenDetail(true);
                  }}
                />
            
            </div>
          );
        },
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

  if (isError) {
    return <>Eroor</>
  } else if (isLoading || !roles) {
    return <>loading</>
  }

  return (
    <>
      <div>
      
          <div className="flex justify-end mr-4 mt-10">
            <Button onClick={handleAddFarmerNavigation} className="px-10">
              <Plus className="mr-2 h-4 w-4" />
              Add New Role
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
                  Roles
                </h1>
              </div>
            </div>
          </div>

          <div className="mx-2 mt-2">
            <div className="flex items-center space-x-2 pb-4">
              <div className="flex-1">
                <Input
                  type="text"
                  icon={
                    <SearchIcon
                      size={20}
                      className="ml-2 font-bold text-slate-500"
                    />
                  }
                  placeholder="Search for lead farmer"
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
            <div className="rounded-md border w-full">
              <ScrollArea className="h-full w-full  overflow-auto">
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
                    {(isLoading || isRefetching) && !roles ? (
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
                          className={`cursor-pointer text-primaryText hover:bg-primary/10 ${
                            row.getIsSelected() ? "bg-gray-200" : ""
                          }`}
                          onClick={() => row.toggleSelected()}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="text-start">
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
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
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
                      {/* <SelectItem value={"25"}>25</SelectItem>
                    <SelectItem value={"50"}>50</SelectItem>
                    <SelectItem value={"100"}>100</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {/* <PaginationComponent
                currentPage={page}
                totalPages={roles?.metadata.pagination.numberOfPages}
                setPage={setPage}
              /> */}
              {open && <AddNewRole open={open} setOpen={setOpen} />}
              {openDetail && detailRoleId && (
                <DetailRole
                  open={openDetail}
                  setOpen={setOpenDetail}
                  id={detailRoleId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}