"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GeneralInformation({ farmerData }: { farmerData: any }) {
  return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">General Information</h3>
         
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
        <div className="space-y-2 " >
            <Label>Phone Type	  </Label>
            <Input value={farmerData?.phone_type	} readOnly />
          </div>
          <div className="space-y-2">
            <Label> agriculture experiance	</Label>
            <Input value={farmerData?.agriculture_experiance		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>Total Number Of family member older than 60</Label>
            <Input value={farmerData?.first_name}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>No of childeren under 12</Label>
            <Input value={farmerData?.first_name}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>Type of house</Label>
            <Input value={farmerData?.first_name}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>Occupation</Label>
            <Input value={farmerData?.first_name}  readOnly />
          </div>
          
        </div>
      </div>
  );
}