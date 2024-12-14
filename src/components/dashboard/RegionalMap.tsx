"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface RegionData {
  regionCode: string;
  region: string;
  male: number;
  female: number;
  count: number;
}

interface DashboardStatsProps {
  data: {
    region: string;
    regionData: RegionData; // Assuming this is a single object
  };
}

export function RegionalMap({ data }: DashboardStatsProps) {
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);

  const handleMapHover = () => {
    // When the map is hovered, show the data for the region
    setHoveredRegion(data?.region.regionData || null);
  };

  const handleMapLeave = () => {
    // Reset the hover state when the map is no longer hovered
    setHoveredRegion(null);
  };
  const datam= data?.region.regionData
  console.log(datam[0].region)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primaryText">Registered Farmers Across Each Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full">
          <h1 className="text-center text-lg">Registered Farmers Across</h1>

          {/* Map Image */}
          <div
            className="absolute inset-0 bg-green-100 rounded-lg flex text-center justify-center"
            onMouseEnter={handleMapHover}  // Trigger hover on map image
            onMouseLeave={handleMapLeave}   // Reset hover state when leaving map
          >
            <Image
              src="/assets/images/Ethmap.svg"
              alt="Ethiopia Map"
              width={500}
              height={300}
            />
          </div>

          {/* Display Popup with Region Data when hovered */}
          {hoveredRegion && (
            <div
              className="absolute bg-white text-black p-4 rounded shadow-lg"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3 className="font-bold text-primaryText">{hoveredRegion[0].region}</h3>
              <p>Male: {hoveredRegion[0].male}</p>
              <p>Female: {hoveredRegion[0].female}</p>
              <p>Total: {hoveredRegion[0].count}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
