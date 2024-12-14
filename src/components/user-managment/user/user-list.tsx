"use client"

import { columns } from "./data/columns"
import { DataTable } from "./table/data-table"
import {  useGetUser } from "@/hooks/useUser";

export function UserList() {
  const {
    data: farmers,
    isLoading,
    isError,
    isSuccess,
    refetch,
    isRefetching,
  } = useGetUser();


  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">User Lists</h2>
        <DataTable columns={columns} data={farmers?.message} />
      </div>
    </div>
  )
}