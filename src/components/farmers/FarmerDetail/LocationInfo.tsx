"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "../../ui/button";

export function LocationInfo() {
  return (
      <div className="space-y-6 p-6">
      <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">Location Information</h3>
          
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2">
            <Label>Region</Label>
            <Input value="Oromia" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Zone</Label>
            <Input value="West Arsi" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Woreda</Label>
            <Input value="Shashemene" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Kebele</Label>
            <Input value="01" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Village</Label>
            <Input value="Abosto" readOnly />
          </div>
          <div className="space-y-2">
            <Label>GPS Location</Label>
            <Input value="7.2006° N, 38.5990° E" readOnly />
          </div>
        </div>
      </div>
  );
}