import RoleService from "@/services/RoleService";
import { useMutation, useQuery } from "@tanstack/react-query";

// const useGetRole = (page: number, limit: number,searchQuery:string) => {
//   return useQuery({
//     queryKey: ["role", page, limit,searchQuery],
//     queryFn: async () => {
//       const response = await RoleService.getRoles(page, limit,searchQuery);
//       return response.data;
//     },
//   });
// };
const useGetRoleDetail = (id: number) => {
  return useQuery({
    queryKey: ["role", id],
    queryFn: async () => {
      const response = await RoleService.getRoleDetail (id);
      return response.data;
    },
  });
};

const useAddRole = () => {
  return useMutation({
    mutationFn: async (newRole: any) => {
      return RoleService.addRole(newRole);
    },
  });
};

const useUpdateRole = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return RoleService.updateRole(id, data);
    },
  });
};

const useDeleteRole = () => {
  return useMutation({
    mutationFn: async (id: any) => {
      return RoleService.deleteRole(id);
    },
  });
};


const useGetRole = () => {
  return useQuery({
    queryFn: async () => {
      const response = await RoleService.getRole();
      return response.data;
    },
    retry: true,
  });
};


export {  useAddRole, useUpdateRole, useDeleteRole,useGetRole,useGetRoleDetail };
