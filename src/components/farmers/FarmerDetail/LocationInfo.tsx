"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save } from "lucide-react";
import { Button } from "../../ui/button";
import { useUpdateFarmer } from "@/hooks/useFarmer";

export function LocationInfo({ farmerData }: { farmerData: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(farmerData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
  };

  const { mutate: updateFarmer, isError, isSuccess } = useUpdateFarmer();

  const handleSave = () => {
    // Extract only the changed fields
    const updatedData: any = { location: {}, address: {} };

    Object.keys(formData.location).forEach((key) => {
      if (formData.location[key] !== farmerData.location[key]) {
        updatedData.location[key] = formData.location[key];
      }
    });

    Object.keys(formData.address).forEach((key) => {
      if (formData.address[key] !== farmerData.address[key]) {
        updatedData.address[key] = formData.address[key];
      }
    });

    // Construct the payload
    const payload = {
      updateFarmerData: {
        ...updatedData.location,
        ...updatedData.address,
      },
    };

    // Send only the changed data
    updateFarmer({
      id: farmerData.id,
      field: payload,
    });

    // Exit edit mode
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-primaryText">
          Location Information
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <Save className="h-5 w-5 text-primary" />
          ) : (
            <Pencil className="h-5 w-5 text-primaryText" />
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-primaryText">
        <div className="space-y-2">
          <Label>Region</Label>
          <Input
            name="region"
            value={formData?.location.region}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Zone</Label>
          <Input
            name="zone"
            value={formData?.location.zone}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Woreda</Label>
          <Input
            name="woreda"
            value={formData?.location.woreda}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Kebele</Label>
          <Input
            name="kebele"
            value={formData?.address.kebele}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>Village</Label>
          <Input
            name="village"
            value={formData?.address.village}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label>GPS Location</Label>
          <Input
            name="edacap_location_name"
            value={formData?.location.edacap_location_name}
            readOnly={!isEditing}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}
