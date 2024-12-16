"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, ChevronDown, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapse";
import { useUpdateFarmer } from "@/hooks/useFarmer";

export function FarmlandInfo({ farmerData }: { farmerData: any }) {
  const { mutate: updateFarmer, isError, isSuccess } = useUpdateFarmer();
  const [editableFarmland, setEditableFarmland] = useState<string | null>(null);
  const [formState, setFormState] = useState(farmerData?.farmer_land);

  const toggleEdit = (farmlandId: string) => {
    if (editableFarmland === farmlandId) {
      // Save and close editing
      const farmlandToUpdate = formState.find((land) => land.id === farmlandId);
      if (farmlandToUpdate) {
        // Create the payload with the updated farmland data
        const payload = {
          updateFarmerData: {
            soil_type: farmlandToUpdate.soil_type,
            parcel_number: farmlandToUpdate.parcel_number,
            land_hectare: farmlandToUpdate.land_hectare,
            produce_name: farmlandToUpdate.produce_name,
            mechanization_usage: farmlandToUpdate.mechanization_usage,
          },
        };
  
        // Call the updateFarmer function with the correct payload
        updateFarmer({
          id: farmerData.id,  // Assuming `farmerData.id` is correct
          field: payload,  // Send the payload inside `field`
        });
      }
      // Close the edit mode
      setEditableFarmland(null);
    } else {
      // Open the edit mode for the selected farmland
      setEditableFarmland(farmlandId);
    }
  };
  

  const handleInputChange = (farmlandId: string, field: string, value: any) => {
    setFormState((prevState) =>
      prevState.map((land) =>
        land.id === farmlandId ? { ...land, [field]: value } : land
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center text-primaryText">
        <h3 className="text-lg font-semibold">Farmland Information</h3>
      </div>

      {formState.map((farmland) => (
        <Collapsible key={farmland.id} className="border rounded-md">
          <CollapsibleTrigger className="text-lg font-semibold flex justify-between items-center w-full px-4 py-2 bg-green text-primaryText border-b">
            Farmland {farmland.length} <ChevronDown />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 text-primaryText">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleEdit(farmland.id)}
              >
                {editableFarmland === farmland.id ? (
                  <Save className="h-5 w-5 text-primary" />
                ) : (
                  <Pencil className="h-5 w-5 text-primaryText" />
                )}
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-primaryText mt-4">
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Input
                  value={farmland.soil_type}
                  readOnly={editableFarmland !== farmland.id}
                  onChange={(e) =>
                    handleInputChange(farmland.id, "soil_type", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Parcel Number</Label>
                <Input
                  value={farmland.parcel_number}
                  readOnly={editableFarmland !== farmland.id}
                  onChange={(e) =>
                    handleInputChange(farmland.id, "parcel_number", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Total Land Size (Hectares)</Label>
                <Input
                  value={farmland.land_hectare}
                  readOnly={editableFarmland !== farmland.id}
                  onChange={(e) =>
                    handleInputChange(farmland.id, "land_hectare", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Produce Type</Label>
                <Input
                  value={farmland.produce_name}
                  readOnly={editableFarmland !== farmland.id}
                  onChange={(e) =>
                    handleInputChange(farmland.id, "produce_name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Mechanization Usage</Label>
                <Input
                  value={farmland.mechanization_usage}
                  readOnly={editableFarmland !== farmland.id}
                  onChange={(e) =>
                    handleInputChange(farmland.id, "mechanization_usage", e.target.value)
                  }
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
