"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PersonalDetails() {
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
            <Label>First Name</Label>
            <Input value="Hanna" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Middle Name</Label>
            <Input value="Habtemichael" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input value="Getachew" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Gender</Label>
            <Input value="Female" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Age</Label>
            <Input value="28" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Marital Status</Label>
            <Input value="Married" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value="09000001" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Preferred Language</Label>
            <Input value="Oromiffa" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Family Size</Label>
            <Input value="4" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Literacy Level</Label>
            <Input value="Diploma" readOnly />
          </div>
        </div>
      </div>
  );
}