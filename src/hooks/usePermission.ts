import PermissionService from "@/services/permission";
import { useQuery } from "@tanstack/react-query";

const useGetPermission = () => {
  return useQuery({
    queryFn: async () => {
      const response = await PermissionService.getPermission();
      return response.data;
    },
    retry: true,
  });
};

export { useGetPermission };
