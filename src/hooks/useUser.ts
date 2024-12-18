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
/*************  ✨ Codeium Command ⭐  *************/
/**
 * A hook to add a new employee to the database.
 * @returns An object with two properties: `mutate` and `isLoading`.
 * The `mutate` function takes a single object argument with the new employee's
 * details and returns a promise that resolves to the newly created employee.
 * The `isLoading` property is a boolean that is true when the mutation is in
 * progress and false otherwise.
 */
/******  07f52f8b-ef4c-4cc4-b70c-98b2ac3c30f4  *******/
const useAddUser = () => {
  return useMutation({
    mutationFn: async (newRole: any) => {
      return EmployeeService.addEmployee(newRole);
    },
  });
};

export { useGetUser };
