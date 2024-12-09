"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CheckHomePageSession = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (status === "authenticated") {
        router.push("/dashboard", { scroll: false });
      }
    };
  }, [status, session, router]);


  return children;
};

export default CheckHomePageSession;
