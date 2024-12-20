import userService from "@/services/userService";
import { useQuery, useMutation } from "@tanstack/react-query";

interface NewUser {
  username: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role_id: number;
  preferred_language: string;
  kebele: string;
  woreda: string;
  password: string;
}

const useAddUser = () => {
  return useMutation({
    mutationFn: async (newUser: NewUser) => {
      return userService.addUser(newUser);
    },
  });
};

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


export { useGetUser,useAddUser };
