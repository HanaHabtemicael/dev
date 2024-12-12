"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RegionalMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registered Farmers Across Each Regions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full">
          <div className="absolute inset-0 bg-green-100 rounded-lg">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/75 text-white p-4 rounded-lg">
              <h3 className="font-bold">Oromia Region</h3>
              <p>Male: 230</p>
              <p>Female: 330</p>
              <p className="font-bold mt-2">560 Total Farmer</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}