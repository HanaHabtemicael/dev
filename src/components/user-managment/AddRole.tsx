"use client";
import { useForm } from "react-hook-form";
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
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { permissions } from "@/constants/data";
import { Circle, CircleCheck, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useAddRole } from "@/hooks/useRole";

const formSchema = z.object({
  role_name: z.string().min(1, "Required"),
  role_description: z.string(),
  permission_ids: z.array(z.number()),
});

type RoleFormValue = z.infer<typeof formSchema>;

const AddNewRole = ({ open, setOpen }) => {
  const form = useForm<RoleFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: "",
      role_description: "",
      permission_ids: [],
    },
  });

  const handleChange = (name) => (checked) => {
    if (checked) {
      form.setValue("permission_ids", [
        ...form.getValues().permission_ids,
        name,
      ]);
    } else {
      form.setValue(
        "permission_ids",
        form.getValues().permission_ids.filter((item) => item !== name)
      );
    }
  };
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: addNewRole, isPending: addRoleLoading } = useAddRole();

  const onSubmit = async (data: RoleFormValue) => {
    const submitData = {
      name: data.role_name,
      description: data.role_description,
      permission_ids: data.permission_ids,
    };

    addNewRole(submitData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["role"] });
        toast({
          style: {
            backgroundColor: "#16a34a",
            color: "#fff",
            padding: ".5rem",
          },
          description: "New Role Added Successfully.",
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
      <DialogContent className="text-primaryText sm:w-full lg:max-w-5xl p-0">
        <ScrollArea className="h-screen p-14 lg:w-full overflow-y-auto">
          <DialogHeader>
            <div className="select-none flex justify-center flex-col text-center mb-2">
              <Label className="text-xl font-[500] leading-none tracking-wide self-center">
                Add New Role
              </Label>
              <Label className="text-[0.9rem] font-[400] leading-none tracking-wide self-center text-slate-500">
                Create a new role for your organization
              </Label>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2 p-1">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="role_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter Role name"
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.role_name?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <div className="lg:col-span-2 col-span-1">
                    <FormField
                      control={form.control}
                      name="role_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role Description</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="Description"
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.role_description?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="select-none flex justify-center flex-col text-center">
                  <Label className="text-md font-[500] leading-none tracking-wide self-center">
                    Select Permissions
                  </Label>
                </div>

                <div className="flex flex-col space-y-2">
                  {permissions.map((permission, index) => (
                    <div key={index} className="border rounded p-2 select-none">
                      <Label className="text-sm font-[500] leading-none tracking-wide self-center">
                        {permission.name}
                      </Label>
                      <div className="grid grid-cols-4 gap-4">
                        {permission.permissions.map((permission) => (
                          <PermissionCheckbox
                            key={permission.id}
                            name={permission.code_name}
                            label={permission.name}
                            checked={form
                              .watch("permission_ids")
                              .includes(permission.id)}
                            onChange={handleChange(permission.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter className="mt-10 flex-row justify-between min-w-min">
                <Button
                  type="submit"
                  disabled={addRoleLoading}
                  className="bg-primary text-white hover:bg-primary/80 focus-visible:ring-primary min-w-32 px-10"
                >
                  {addRoleLoading ? t("Please_wait") : t("Add_Role")}
                  <Plus className=" w-4 h-4 ml-2" />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PermissionCheckbox = ({ name, label, checked, onChange }) => {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer hover:underline select-none underline-offset-2 decoration-black"
      onClick={() => onChange(!checked)}
    >
      {checked ? <CircleCheck className="text-green-600" /> : <Circle />}
      <label
        htmlFor={name}
        className={cn(
          "text-sm cursor-pointer font-semibold",
          checked ? "text-green-600" : "text-primaryText"
        )}
      >
        {label}
      </label>
    </div>
  );
};

export default AddNewRole;