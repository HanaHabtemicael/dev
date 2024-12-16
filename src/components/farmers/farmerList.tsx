"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  useGetFarmer,
  Farmer,
  useGetAllFarmers,
  useGetFarmersForExport,useDeletFarmer
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
import { Eye,Trash2 } from "lucide-react";
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
import Link from 'next/link';
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useDebounce } from "use-debounce";
import { PaginationComponent } from "@/components/pagination"
import { CSVLink } from "react-csv";
import { Breadcrumb } from "../layout/breadcrumb";

const ConfirmationModal = ({ open, onClose, onConfirm, farmer }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-1/3">
        <h3 className="text-xl font-semibold">Are you sure you want to delete?</h3>
        <p className="mt-2">This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => onConfirm(farmer)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
export default function FarmerList() {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(10);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);


  const {
    data: farmers,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetAllFarmers(page, limit);
  console.log("farmers",farmers)

  useEffect(() => {
    setSearchLoading(true);
    refetch().finally(() => setSearchLoading(false));
  }, [limit, page, refetch, farmers]);

  const data = useMemo(
    () =>
      farmers?.data?.map((farmer: Farmer) => ({
        id: farmer.id,
        FirstName: farmer.first_name,
        MiddleName: farmer.middle_name,
        LastName: farmer.last_name,
        Region:farmer.location.region,
        PhoneNumber: farmer.phone_number,
        Age:farmer.age,
        MembershipStatus: farmer.MembershipStatus,
      })) || [],
    [farmers],
  );
  const { mutate: deleteFarmer, isLoading: isDeleting } = useDeletFarmer();

  // Delete the selected farmer
  const handleDeleteFarmer = (farmer) => {
    if (farmer) {
      deleteFarmer(farmer.id, {
        onSuccess: () => {
          setIsModalOpen(false);
          refetch(); // Refetch the farmer list after deletion
        },
        onError: (error) => {
          console.error("Failed to delete farmer:", error);
        },
      });
    }
  };

  
 
    

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
            Farmer Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) =>
          `${row.original.FirstName} ${row.original.MiddleName} ${row.original.LastName}`,
      },
      {
        accessorKey: "PhoneNumber",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "Region",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Region
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        ),
      },
      {
        accessorKey: "Age",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Age
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
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
                onClick={() =>
                  router.push(`/dashboard/farmer/${row.original.id}`)
                }
              />
              <Trash2
  size={26}
  className="text-red-500"
  onClick={() => {
    setSelectedFarmer(row.original);
    setIsModalOpen(true);
  }}
/>

            </div>
          );
        },
      },
    ],
    [],
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

  const { data: allFarmers } = useGetAllFarmers(
    page,
    limit,

  );
  const columnHeaderMapping: Record<string, string> = {
    OfftakerFarmerID: "Registration Number",
    FullName: "Farmer Name",
    PhoneNumber: "Phone Number",
    MembershipStatus: "Membership",
  };

  const csvHeaders = useMemo(() => {
    return table
      .getAllColumns()
      .filter(
        (col) =>
          col.getIsVisible() && col.id !== "select" && col.id !== "Actions",
      )
      .map((col) => ({
        label: columnHeaderMapping[col.id] || col.id,
        key: col.id,
      }));
  }, [table]);

  const csvData = useMemo(() => {
    const data = allFarmers?.data || [];
    console.log("nmf",data)
    return (
      data?.map((row: { [x: string]: any; FirstName: any; middle_name: any; last_name: any; }) => {
        const transformedRow = {};
        csvHeaders.forEach(({ key }) => {
          transformedRow[key] =
            key === "FullName"
              ? `${row.FirstName || ""} ${row.MiddleName || ""} ${row.LastName || ""}`
              : row[key] || "";
        });
        return transformedRow;
      }) || []
    );
  }, [allFarmers, csvHeaders]);

  const handleAddFarmerNavigation = () => {
    router.push("/dashboard/farmer/add", { scroll: false });
  };

  return (
    <div>
      <div className="flex justify-start ml-4 mt-10">
      
       <div className="flex items-center gap-2 text-primaryText mb-6">
      <Link href="/" className="hover:text-foreground">Dashboard</Link>
      <span > / </span>
      <Link href="/farmer" className="hover:text-foreground"><span className="text-primary font-semibold">Farmers</span></Link>
      
    </div>

      </div>
      <div className="bg-white shadow-md rounded-md mx-4 mt-4">
        <div className="pt-5 flex flex-row items-baseline">
          <div className="flex justify-between items-center">
            <div>
              {/* <span className="text-xs text-primary">
                List of Not Model Farmers
              </span> */}
              <h1 className="pl-2 mt-2 text-2xl text-primaryText leading-10 font-bold text-small-screen">
                List of farmers
              </h1>
            </div>
          </div>
          <div className="ml-auto flex justify-end gap-4 mr-2">
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="farmers.csv"
              className="bg-slate-300 hover:bg-slate-200  text-primary h-9 w-50 px-5 py-2 rounded-md flex flex-row "
            >
              <FileX className="pr-1" /> Export
            </CSVLink>
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
                              header.getContext(),
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
                      className={`cursor-pointer text-[#4B465C] hover:bg-gray-200 text-center ${
                        row.getIsSelected() ? "bg-gray-200" : ""
                      }`}
                      onClick={() => row.toggleSelected()}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
            <ConfirmationModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleDeleteFarmer}
          farmer={selectedFarmer}
        />
          </div>
        </div>
      </div>
    </div>
  );
}
