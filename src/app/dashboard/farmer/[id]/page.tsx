import { FarmerDetails } from "@/components/farmers/FarmerDetail/FarmerDetails";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb } from "@/components/farmers/Breadcrumb";
import { FarmerDetailTab } from "@/components/farmers/FarmerDetailTab";


export default function FarmerDetailPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Breadcrumb />

      <FarmerDetailTab farmerId={params.id} />
    </>
  );
}
