"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FarmlandInfo() {
  return (
      <div className="space-y-6 p-6">
      <div className="flex justify-between items-center text-primaryText">
          <h3 className="text-lg font-semibold">Farmland Information</h3>
          <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2">
            <Label>Total Land Size (Hectares)</Label>
            <Input value="2.5" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Cultivated Area (Hectares)</Label>
            <Input value="2.0" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Main Crops</Label>
            <Input value="Wheat, Teff, Maize" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Irrigation Access</Label>
            <Input value="Yes" readOnly />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label>Soil Type</Label>
            <Input value="Loamy" readOnly />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label>Additional Notes</Label>
            <Textarea 
              value="The farm has good irrigation access and is suitable for multiple crop cycles per year."
              readOnly 
              className="h-24"
            />
          </div>
        </div>
      </div>
  );
}