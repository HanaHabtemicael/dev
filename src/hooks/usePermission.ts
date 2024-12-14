import PermissionService from "@/services/permission";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await PermissionService.getPermission();
      return response.data.data;
    },
    retry: true,
  });
};

export { useGetUser };
