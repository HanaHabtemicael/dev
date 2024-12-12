"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapse";

export function FarmlandInfo({ farmerData }: { farmerData: any }) {
  const farmlandData = [
    {
      id: 1,
      totalLandSize: "2.5",
      cultivatedArea: "2.0",
      mainCrops: "Wheat, Teff, Maize",
      irrigationAccess: "Yes",
      soilType: "Loamy",
      notes:
        "The farm has good irrigation access and is suitable for multiple crop cycles per year.",
    },
    {
      id: 2,
      totalLandSize: "3.0",
      cultivatedArea: "2.5",
      mainCrops: "Barley, Sorghum",
      irrigationAccess: "No",
      soilType: "Clay",
      notes:
        "The farm relies on seasonal rain and is suitable for specific crops.",
    },
    {
      id: 3,
      totalLandSize: "4.0",
      cultivatedArea: "3.0",
      mainCrops: "Corn, Soybean",
      irrigationAccess: "Yes",
      soilType: "Sandy",
      notes: "The farm is located near a river and has excellent drainage.",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center text-primaryText">
        <h3 className="text-lg font-semibold">Farmland Information</h3>
        <Button variant="outline" size="icon">
          <Pencil className="h-5 w-5 text-primaryText" />
        </Button>
      </div>

      {farmerData?.farmer_land.map((farmland) => (
        <Collapsible key={farmland.id} className="border rounded-md">
          <CollapsibleTrigger className="text-lg font-semibold flex justify-between items-center w-full px-4 py-2 bg-green text-primaryText border-b">
            Farmland {farmland.id} <ChevronDown />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 text-primaryText">
            <div className="grid md:grid-cols-2 gap-6 text-primaryText mt-4">
            <div className="space-y-2">
                <Label>Soil Type</Label>
                <Input value={farmland.soil_type} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Parcel Number</Label>
                <Input value={farmland.parcel_number} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Total Land Size (Hectares)</Label>
                <Input value={farmland.land_hectare} readOnly />
              </div>
             
              <div className="space-y-2">
                <Label>Produce Type</Label>
                <Input value={farmland.produce_name} readOnly />
              </div>
              <div className="space-y-2">
                <Label>mechanization usage</Label>
                <Input value={farmland.mechanization_usage} readOnly />
              </div>
             
             
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
