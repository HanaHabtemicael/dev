"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function RegionalMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primaryText">Registered Farmers Across Each Regions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full">
          <h1>Registered Farmers Accros</h1>
          <div className="absolute inset-0 bg-green-100 rounded-lg flex text-center justify-center">
          <Image src="/assets/images/Ethmap.svg" alt= "imag" width={500} height={100}/>

          </div>

        </div>
      </CardContent>
    </Card>
  );
}