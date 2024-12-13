"use client";;
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
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

import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { PasswordInput } from "../ui/password-input";
import { useAddEmployee } from "@/hooks/useEmployee";
import { Plus } from "lucide-react";
import { AutoComplete } from "../ui/autocomplete";
import { useGetRoleWithSearch } from "@/hooks/useRole";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

const formSchema = z.object({
  username: z.string().min(3, "Required (min 3 characters)"),
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  phone_number: z.string().min(9, "Phone number must be greater than 9 digits"),
  email: z.string().min(1, "Required"),

  role: z.object({
    id: z.string().trim().min(1, "required"),
    name: z.string().trim().min(1, "required"),
  }),
  preferred_language: z.string().min(1, "Required"),
  kebele: z.string().min(1, "Required"),
  woreda: z.string().min(1, "Required"),

  password: z.string().min(6, "must be at least 6 characters"),
});

type FieldAgentFormValue = z.infer<typeof formSchema>;

const AddNewUser = ({ open, setOpen }) => {
  const form = useForm<FieldAgentFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",

      role: {
        id: "",
        name: "",
      },
      preferred_language: "",
      kebele: "",
      woreda: "",

      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [searchRoleQuery, setSearchRoleQuery] = React.useState("");

  const {
    mutate: addNewEmployee,
    isPending,
    isError,
    isSuccess: isAddEmployeeSuccess,
    error: addEmployeeError,
  } = useAddEmployee();

  const {
    data: roles,
    isLoading: roleIsLoading,
    refetch: refetchRoles,
    isRefetching: isRoleRefetching,
    error: roleError,
    isSuccess: isRoleSuccess,
  } = useGetRoleWithSearch({
    search: searchRoleQuery,
  });

  const onSubmit: SubmitHandler<FieldAgentFormValue> = (data) => {
    const submitData = {
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,

      role_id: parseInt(data.role.id),
      preferred_language: data.preferred_language,
      kebele: data.kebele,
      woreda: data.woreda,

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
              <Label className="text-xl font-[500] leading-none tracking-wide self-center">
                Add New User
              </Label>
              <Label className="text-[0.9rem] font-[400] leading-none tracking-wide self-center text-slate-500">
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
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter First Name"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.first_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Last Name"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.last_name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Role"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.username?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter Phone Number"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.phone_number?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter Email Address"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              
            

             
            </div>
            <DialogFooter className="mt-10 flex-row justify-between min-w-min">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#228D4D] text-white"
              >
                {isPending ? "Adding" : "Add Record"}
                <Plus className=" w-4 h-4 ml-2" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewUser;
