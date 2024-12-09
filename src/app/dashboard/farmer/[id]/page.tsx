import { FarmerDetails } from "@/components/farmers/FarmerDetail/FarmerDetails";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/farmers/Breadcrumb";
import { FarmerDetailTab } from "@/components/farmers/FarmerDetailTab";

export function generateStaticParams() {
  // Generate paths for all farmer IDs
  return [{ id: "1" }];
}

export default function FarmerDetailPage() {
  return (
    <>
      <Breadcrumb />

      <FarmerDetailTab />
    </>
  );
}
