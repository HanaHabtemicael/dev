import { LocateFixed, MapPin, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FarmerProfileHeaderSkeleton() {
  return (
    <div className="w-full rounded-md overflow-hidden shadow ">
      <div className="relative">
        <div className="absolute h-full w-full bg-gradient-to-b from-primary via-primary/90 to-primary/70"></div>
        <Image
          src="/assets/images/profile_header.png"
          alt={"img"}
          width={1000}
          height={1000}
          //   className="p-2"
          style={{
            width: "100%",
            height: "100px",
            objectFit: "cover",
            overflow: "hidden",
            zIndex: 0,
          }}
        />
      </div>
      <div className="w-full flex justify-between">
        <div className="flex w-full space-x-4 px-6">
          <div className="relative -top-8 h-20 w-20 bg-white p-1 hover:p-[.15rem] duration-100 rounded-lg overflow-hidden cursor-pointer">
            <Skeleton className="h-full w-full bg-primary/20 rounded-[.4rem]" />
          </div>
          <div className="flex-1 w-full flex justify-between items-stretch">
            <div className="flex flex-col justify-evenly">
              <div>
                <Skeleton className="h-6 w-[250px] bg-primary/20" />
              </div>
              <div className="flex space-x-4 text-slate-700">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-[20px] bg-primary/20" />
                  <Skeleton className="h-4 w-[100px] bg-primary/20" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-[20px] bg-primary/20" />
                  <Skeleton className="h-4 w-[100px] bg-primary/20" />
                </div>
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-[20px] bg-primary/20" />
                  <Skeleton className="h-4 w-[100px] bg-primary/20" />
                </div>
              </div>
            </div>
            <div className="self-center">
              <Skeleton className="h-10 w-[200px] bg-primary/20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
