"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Loader2,
  Mail,
  MapPin,
  Phone,
  Plus,
  UserRound,
  RectangleEllipsis,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "../ui/password-input";
import { useAddEmployee } from "@/hooks/useEmployee";
import { AutoComplete } from "../ui/autocomplete";
import { useGetRole } from "@/hooks/useRole";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { useAddUser } from "@/hooks/useUser";

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  phoneNumber: z.string().min(9, "Phone number must be greater than 9 digits"),
  email: z.string().min(1, "Required"),
  roleId: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  password: z.string().min(6, "must be at least 6 characters"),
});

type FieldAgentFormValue = z.infer<typeof formSchema>;

const AddNewUser = ({ open, setOpen }) => {
  const form = useForm<FieldAgentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      roleId: "",
      address: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchRoleQuery, setSearchRoleQuery] = React.useState("");

  const {
    mutate: addNewEmployee,
    isError,
    isSuccess: isAddEmployeeSuccess,
    error: addEmployeeError,
  } = useAddUser();

  const {
    data: roles,
    isLoading: roleIsLoading,
    refetch: refetchRoles,
    isRefetching: isRoleRefetching,
    error: roleError,
    isSuccess: isRoleSuccess,
  } = useGetRole();
  console.log("drty", roles);

  const onSubmit: SubmitHandler<FieldAgentFormValue> = (data) => {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      roleId: data.roleId,
      address: data.address,
      password: data.password,
    };
    setLoading(true);
    addNewEmployee(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast({
          style: {
            backgroundColor: "#16a34a",
            color: "#fff",
            padding: ".5rem",
          },
          description: "New Employee Added Successfully.",
        });
        setOpen(false);
      },
      onError: () => {
        toast({
          variant: "destructive",
          style: {
            padding: ".5rem",
          },
          description: "Something went wrong. Try again.",
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:w-full p-14 lg:min-w-[825px] lg:max-w-screen-lg overflow-y-auto max-h-screen">
        <DialogHeader>
          <div className="select-none flex justify-center flex-col text-center">
            <div className="select-none flex justify-center flex-col text-center mb-2">
              <Label className="text-xl font-bold leading-none tracking-wide self-center">
                Add New User
              </Label>
              <Label className="text-[0.9rem] font-[400] leading-none tracking-wide self-center text-primary">
                Fill all required information
              </Label>
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>firstName</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <UserRound
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        {...field}
                        type="text"
                        placeholder="Enter_firstName"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.firstName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>lastName</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <UserRound
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        {...field}
                        type="text"
                        placeholder="Enter_lastName"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.lastName?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phoneNumber</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <Phone
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        {...field}
                        type="text"
                        placeholder="Enter_phoneNumber"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phoneNumber?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adress</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <MapPin
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        {...field}
                        type="text"
                        placeholder="Enter_Your address"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.address?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email_Address</FormLabel>
                    <FormControl>
                      <Input
                        icon={
                          <Mail
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        {...field}
                        type="email"
                        placeholder="Enter_Email_Address"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        icon={
                          <RectangleEllipsis
                            size={20}
                            className="ml-2 font-bold text-slate-500"
                          />
                        }
                        id="password_confirmation"
                        className="focus-visible:ring-primary/60"
                        placeholder="Enter_your_password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage>
                      {form.formState.errors.password?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <AutoComplete
                options={
                  (isRoleRefetching || roleIsLoading ? [] : roles?.data) // Access data correctly
                    ?.map((role) => ({
                      label: role.name,
                      value: role.id.toString(),
                    })) || []
                }
                emptyMessage="No results."
                label="Role"
                placeholder="Choose User Role"
                isLoading={roleIsLoading || isRoleRefetching}
                onValueChange={(value) => {
                  const selectedRole = (
                    isRoleRefetching || roleIsLoading ? [] : roles?.data
                  )?.find((f) => f.id.toString() === value);

                  form.setValue("roleId", selectedRole?.id || ""); // Set value to roleId instead of role
                }}
                value={{
                  label: form.getValues().roleId
                    ? roles?.data?.find(
                        (role) => role.id === form.getValues().roleId
                      )?.name
                    : "",
                  value: form.getValues().roleId || "",
                }}
                setValue={(value) => {
                  form.setValue("roleId", value.value); // Ensure correct key (roleId)
                  form.trigger("roleId");
                }}
                error={form.formState.errors.roleId?.message}
                description="Select the User Role"
                onSearch={(value) => {
                  setSearchRoleQuery(value);
                  refetchRoles();
                }}
              />
            </div>
            <DialogFooter className="mt-10 flex-row justify-between min-w-min">
              <Button type="submit" className="bg-[#228D4D] text-white">
                <Plus className=" w-4 h-4 ml-2" />
                Add User
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewUser;
