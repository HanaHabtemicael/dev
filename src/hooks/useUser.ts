import userService from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await userService.getUserList();
      return response.data;
    },
    retry: true,
  });
};

export { useGetUser };
