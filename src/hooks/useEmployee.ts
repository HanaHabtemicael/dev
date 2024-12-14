"use client";
import EmployeeService from "@/services/EmployeeService";
import { useQuery, useMutation } from "@tanstack/react-query";

// Use Farmers with add farmer mutation
const useGetEmployee = (page: number, limit: number, searchQuery?: string) => {
  return useQuery({
    queryKey: ["employees", page, limit, searchQuery],
    queryFn: async () => {
      const response = await EmployeeService.getEmployees(
        page,
        limit,
        searchQuery
      );
      return response.data;
    },
    placeholderData: (prev) => prev,
  });
};

// Fetch farmer detail by ID
const useEmployeeDetail = (id: string) => {
  return useQuery({
    queryKey: ["farmer", id],
    queryFn: async () => {
      const response = await EmployeeService.getEmployeeDetail(id);
      return response.data;
    },
  });
};

const useAddEmployee = () => {
  return useMutation({
    mutationFn: async (newRole: any) => {
      return EmployeeService.addEmployee(newRole);
    },
  });
};


const useGetEmployeeDetail = (id: string) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: async () => {
      const response = await EmployeeService.getEmployeeDetail(id);
      return response.data;
    },
  });
};
const useGetEmployeeWithSearch = (query: { search: string }) => {
  return useQuery({
    queryKey: ["employees", query],
    queryFn: async () => {
      return await EmployeeService.getEmployeeWithSearch(query);
    },
  });
};
const useEmployeeActivation = () => {
  return useMutation({
    mutationFn: async (id: any) => {
      return EmployeeService.employeeActivation(id);
    },
  });
};
const useEmployeeUpdate = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return EmployeeService.employeeUpdate(id,data);
    },
  });
};

const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: async (data: {
      id: string;
      password: string;
    }) => {
      return EmployeeService.updateUserPassword(
        data.id,
        data.password
      );
    },
  });
};

export { useGetEmployee, useEmployeeDetail, useAddEmployee, useGetEmployeeWithSearch,useEmployeeActivation,useGetEmployeeDetail,
  useEmployeeUpdate,
  useUpdateUserPassword
 };
