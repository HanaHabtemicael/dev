import { Card } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 mx-4">
      <div className="mt-4">
        <h1 className="text-2xl text-primary font-semibold">DC Dashboard</h1>
      </div>

      <div className="grid grid-cols-4 gap-6 ">
        <Card className="p-6 text-primaryText">
          <h3 className="font-medium">Total Farmers</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </Card>
        <Card className="p-6 text-primaryText">
          <h3 className="font-medium">Active Farmers</h3>
          <p className="text-2xl font-bold mt-2">987</p>
        </Card>
        <Card className="p-6 text-primaryText">
          <h3 className="font-medium">Total Agents</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </Card>
        <Card className="p-6 text-primaryText">
          <h3 className="font-medium">Active Agents</h3>
          <p className="text-2xl font-bold mt-2">42</p>
        </Card>
      </div>
    </div>
  );
}