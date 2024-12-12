"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PersonalDetails({ farmerData }: { farmerData: any }) {
  return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">Basic Information</h3>
         
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2 " >
            <Label>First Name  </Label>
            <Input value={farmerData?.first_name} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input value={farmerData?.middle_name	} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input value={farmerData?.last_name	} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Input value={farmerData?.gender} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <Input value={farmerData?.age} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Marital Status</Label>
            <Input value={farmerData?.marital_status} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={farmerData?.phone_number} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Alternate Phone number	</Label>
            <Input value={farmerData?.alternate_phone_number } readOnly />
          </div>
          <div className="space-y-2">
            <Label>Family Size</Label>
            <Input value={farmerData?.family_size	} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Literacy Level</Label>
            <Input value={farmerData?.literacy_level} readOnly />
          </div>
        </div>
      </div>
  );
}