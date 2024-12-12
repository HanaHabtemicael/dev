"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from 'next-nprogress-bar';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PasswordInput } from "../ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import { User, RectangleEllipsis } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .refine((val) => val.trim().length > 3, {
      message: "Please enter a valid username or email",
    }),
  password: z.string().min(1, { message: "Password is required" })
  .refine((val) => val.trim().length >= 3, {
    message: "Password is too short",
  })
  ,
});

type UserFormValue = z.infer<typeof formSchema>;

export default function SigninForm() {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const defaultValues = {
    username: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    let res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      // callbackUrl: callbackUrl ?? "/dashboard",
      redirect: false,
    }).then(({ ok, error }) => {
      if (ok) {
          router.push("/dashboard");
      } else {
          console.log(error)
          toast({
            variant: "destructive",
            description: "Invalid username or password",
          });
      }
      return { ok, error };
  });
    if (res && res.ok) {
      router.push("/dashboard", { scroll: false });
    } else {
      form.setError("root", {
        type: "manual",
        message: "Invalid username or password",
      });

      setTimeout(() => {
        form.clearErrors("root");
      }, 5000);
    }
    setLoading(false);
  };

  return (
    < div className=" py-6 px-10 bg-white 
     rounded-lg pb-6  mx-auto flex pt-1 w-full flex-col justify-center items-center space-y-4 sm:max-w-[500px] ">
       <Image
            src="/assets/logo/lersha_logo.png"
            alt={"img"}
            width="108"
            height="108"
            style={{
              // width: "6",
              // height: "6",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <div className="flex flex-col space-y-2 ml-4 text-primaryText">
            <h1 className="text-xl font-semibold tracking-tight">
              Welcome To Data Collection  Dashboard!
            </h1>
            <p className="text-sm text-muted-foreground -mt-2" >
              Enter your email below to create your account
            </p>
          </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600 mt-1">
                  Email or Username
                </FormLabel>
                <FormControl>
                  <Input
                  icon={
                    <User
                      size={20}

                    />
                  }
                    className="focus-visible:ring-primary/60 text-primaryText"
                    type="text"
                    placeholder="Enter your email"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="text-gray-600">Password</FormLabel>
                  <FormLabel className="text-xs text-primary hover:text-primary-light">
                    <Link href="/auth/forget-password">Forgot password?</Link>
                  </FormLabel>
                </div>
                <FormControl>
                  <PasswordInput
                  icon={
                    <RectangleEllipsis
                      size={20}
                      className="ml-2 font-bold text-primaryText"
                    />
                  }
                    id="password_confirmation"
                    className="focus-visible:ring-primary/60 text-primaryText"
                    placeholder="Enter your password"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 py-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm text-primaryText select-none font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </label>
          </div>

          <FormMessage className="text-red-500">
            {form.formState.errors.root?.message}
          </FormMessage>
          <Button
            disabled={loading}
            className="ml-auto w-full bg-primary hover:bg-primary-light"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>
      <div className="flex justify-between items-center">
        <span className="flex justify-center text-center text-primaryText text-sm">
          New on our platform ?
        </span>
        <span className="text-primary text-sm hover:underline underline-offset-4 decoration-2 decoration-grey-600">
            <Link href="/auth/signup">Create an account</Link>
          </span>
      </div>
    </div>
  );
}