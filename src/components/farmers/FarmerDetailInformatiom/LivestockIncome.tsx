"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LivestockIncome({ farmerData }: { farmerData: any }) {
  return (
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center ">
          <h3 className="text-lg font-semibold text-primaryText">livestock Income</h3>
         
        <Button variant="outline" size="icon">
            <Pencil className="h-5 w-5 text-primaryText" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-primaryText">
          <div className="space-y-2 " >
            <Label>milk Income Per Month	</Label>
            <Input value={farmerData?.farm_livestock.milkIncomePerMonth	}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>Number Of Animals For Fattening	</Label>
            <Input value={farmerData?.farm_livestock.numberOfAnimalsForFattening		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>planned Sell Price Per Animal	</Label>
            <Input value={farmerData?.farm_livestock.plannedSellPricePerAnimal		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>bought Animals For Fattening	</Label>
            <Input value={farmerData?.farm_livestock.boughtAnimalsForFattening	}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>salary Income Per Month	</Label>
            <Input value={farmerData?.farm_livestock.salaryIncomePerMonth		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>remittance Income Per Month	</Label>
            <Input value={farmerData?.farm_livestock.remittanceIncomePerMonth		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>rental Income Per Month	</Label>
            <Input value={farmerData?.farm_livestock.rentalIncomePerMonth		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>monthly Expenses	</Label>
            <Input value={farmerData?.farm_livestock.monthlyExpenses		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>studentRemittanceAmount	</Label>
            <Input value={farmerData?.farm_livestock.studentRemittanceAmount		}  readOnly />
          </div>
          <div className="space-y-2">
            <Label>landRentAmount	</Label>
            <Input value={farmerData?.farm_livestock.landRentAmount		}  readOnly />
          </div>


        </div>
      </div>
  );
}