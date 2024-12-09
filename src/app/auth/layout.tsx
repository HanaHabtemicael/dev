"use client";;
import { cn } from "@/lib/utils";
import authentication_left from "/public/assets/images/authentication_left.png";
import Image from "next/image";
import CheckSession from "@/components/auth/checkSession";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Signin",
//   description: "Signin to your account to continue using the app",
// };

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus == "authenticated") {
      router.push("/");
    }
  }, [router, sessionStatus]);


  return (
    <CheckSession>
      <div className="   w-screen">
        
        {children}
      </div>
    </CheckSession>
  );
}