"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function IncomeExpense({ farmerData }: { farmerData: any }) {
  return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">Income Expense Information</h3>
         
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2 " >
            <Label>Land Size In Hectat</Label>
            <Input value="2" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Rented Land in hectar</Label>
            <Input value="3" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Owned Land Title</Label>
            <Input value="3" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Desicion Making Role on Farm</Label>
            <Input value="2" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Source of Advisory Information</Label>
            <Input value="28" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Accesses to Water resource</Label>
            <Input value="Mar" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Accesses to Mechanization service</Label>
            <Input value="Mar" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Type of Farm tool use for farming</Label>
            <Input value="Mar" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Produced output  stored in</Label>
            <Input value="Mar" readOnly />
          </div>
          <div className="space-y-2">
            <Label>Total Number of livestock</Label>
            <Input value="2" readOnly />
          </div>
          <hr/>

                    <h3 className="text-lg font-semibold text-primaryText">Agronomy Information</h3>

        </div>
      </div>
  );
}