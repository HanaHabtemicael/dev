"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";


export function CreaditHistory({ farmerData }: { farmerData: any }) {
 
  return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">Creadit History</h3>
         
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2 " >
            <Label>has Access To Credit Source</Label>
            <Input value={farmerData?.creditHistoryhasAccessToCreditSource		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>received From Microfinance</Label>
            <Input value={farmerData?.creditHistory.receivedFromMicrofinance		} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Microfinance Name	</Label>
            <Input value={farmerData?.creditHistory.microfinanceName		} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Amount Borrowed	</Label>
            <Input value={farmerData?.creditHistory.amountBorrowed		} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Unpaid Amount	</Label>
            <Input value={farmerData?.creditHistory.unpaidAmount		} readOnly />
          </div>
          <div className="space-y-2">
            <Label>unableToRepayCreditOnTime?</Label>
            <Input value={farmerData?.creditHistory.unableToRepayCreditOnTime		}  readOnly />
          </div>
          
        </div>
      </div>
  );
}