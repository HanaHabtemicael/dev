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
import { Circle, CircleCheck, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";
import { useGetRoleDetail, useUpdateRole } from "@/hooks/useRole";
import { useEffect } from "react";

const formSchema = z.object({
  role_name: z.string().min(1, "Required"),
  role_description: z.string(),
  granted_permission_ids: z.array(z.number()),
  denied_permission_ids: z.array(z.number()),
});

type RoleFormValue = z.infer<typeof formSchema>;

const DetailRole = ({ open, setOpen, id }) => {
  const { data: role, isLoading, isSuccess, isError } = useGetRoleDetail(id);

  const form = useForm<RoleFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role_name: "",
      role_description: "",

      granted_permission_ids: [],
      denied_permission_ids: [],
    },
  });

  const handleChange = (id, checked) => {
    if (checked) {
      form.setValue("granted_permission_ids", [
        ...form.getValues().granted_permission_ids,
        id,
      ]);
      form.setValue(
        "denied_permission_ids",
        form.getValues().denied_permission_ids.filter((item) => item !== id)
      );
    } else {
      form.setValue("denied_permission_ids", [
        ...form.getValues().denied_permission_ids,
        id,
      ]);
      form.setValue(
        "granted_permission_ids",
        form.getValues().granted_permission_ids.filter((item) => item !== id)
      );
    }
  };
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateRole, isPending: updateRoleLoading } = useUpdateRole();

  useEffect(() => {
    if (isSuccess) {
      form.setValue("role_name", role.name);
      form.setValue("role_description", role.description);

      permissions.forEach((permission) => {
        permission.permissions.forEach((p) => {
          if (role.permissions.find((rp) => rp.id === p.id)) {
            form.setValue("granted_permission_ids", [
              ...form.getValues().granted_permission_ids,
              p.id,
            ]);
          } else {
            form.setValue("denied_permission_ids", [
              ...form.getValues().denied_permission_ids,
              p.id,
            ]);
          }
        });
      });
    }
  }, [role, isSuccess]);

  const onSubmit = async (data: RoleFormValue) => {
    const submitData = {
      name: data.role_name,
      description: data.role_description,
      granted_permission_ids: data.granted_permission_ids,
      denied_permission_ids: data.denied_permission_ids,
    };
    
    updateRole(
      {
        id,
        data: submitData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["roles"] });
          toast({
            style: {
              backgroundColor: "#16a34a",
              color: "#fff",
              padding: ".5rem",
            },
            description: "Role Updated Successfully.",
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
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="text-primaryText sm:w-full lg:max-w-5xl p-0">
        <ScrollArea className="h-screen p-14 lg:w-full overflow-y-auto">
          <DialogHeader>
            <div className="select-none flex justify-center flex-col text-center">
              <div className="select-none flex justify-center flex-col text-center mb-2">
                <Label className="text-xl font-[500] leading-none tracking-wide self-center">
                  Detail Role
                </Label>
                <Label className="text-[0.9rem] font-[400] leading-none tracking-wide self-center text-slate-500">
                  Update Role Details
                </Label>
              </div>
            </div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              { !role || isError || isLoading ? (
                <div className="flex h-full flex-1 justify-center items-center">
                  <Loader2 size={40} className="text-primary animate-spin" />
                </div>
              ) : (
                <>
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
                                {
                                  form.formState.errors.role_description
                                    ?.message
                                }
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
                        <div
                          key={index}
                          className="border rounded p-2 select-none"
                        >
                          <Label className="text-sm font-[500] leading-none tracking-wide self-center">
                            {permission.name}
                          </Label>
                          <div className="grid grid-cols-4 gap-4">
                            {permission.permissions.map((permission) => (
                              <PermissionCheckbox
                                key={permission.id}
                                id={permission.id}
                                name={permission.code_name}
                                label={permission.name}
                                checked={form
                                  .watch("granted_permission_ids")
                                  .includes(permission.id)}
                                onChange={handleChange}
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
                      disabled={updateRoleLoading}
                      className="bg-primary text-white hover:bg-primary/80 focus-visible:ring-primary min-w-32 px-10"
                    >
                      {updateRoleLoading
                        ? t("Please Wait...")
                        : t("Update_Role")}
                      <Plus className=" w-4 h-4 ml-2" />
                    </Button>
                  </DialogFooter>
                </>
              )}
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PermissionCheckbox = ({ id, name, label, checked, onChange }) => {
  return (
    <div
      className="flex items-center space-x-2 cursor-pointer hover:underline select-none underline-offset-2 decoration-black"
      onClick={() => onChange(id, !checked)}
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

export default DetailRole;