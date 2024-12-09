import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import type { Metadata } from "next";
import DashboardLayoutComponent from "@/components/layout/dashboard-layout";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Contract Farming",
  description: "Contract Farming dashboard ",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <Header /> */}
      {/* <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="relative h-full w-full">
          <Header />
          <main className="flex-1 overflow-hidden pt-16">{children}</main>
        </div>
      </div> */}
      <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
    </>
  );
}
