"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckSession = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   return () => {
  //     if (status === "authenticated") {
  //       router.push("/dashboard", { scroll: false });
  //     }
  //   };
  // }, [status, session, router]);

  // if (status == "loading") {
  //   return <div>Loading...</div>;
  // }

  return children;
};

export default CheckSession;
