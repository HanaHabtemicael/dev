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

  const handleMapHover = (regionCode: string) => {
    const region = data?.region.regionData.find(r => r.regionCode === regionCode) || null;
    setHoveredRegion(region);
  };

  const handleMapLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primaryText">Registered Farmers Across Each Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full">
          <h1 className="text-center text-lg">Registered Farmers Across</h1>

          {/* Map Image */}
          <div className="absolute inset-0 bg-green-100 rounded-lg flex text-center justify-center">
            {/* You need to update this to an SVG map where each region is a separate path */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 500 500" // Adjust based on your map size
              className="w-full h-full"
            >
              <g>
                {/* Example of individual region paths */}
                <path
                  id="region-1"
                  d="M100,100 L200,100 L200,200 L100,200 Z"
                  className="region-path"
                  onMouseEnter={() => handleMapHover("region-1")}
                  onMouseLeave={handleMapLeave}
                />
                <path
                  id="region-2"
                  d="M200,100 L300,100 L300,200 L200,200 Z"
                  className="region-path"
                  onMouseEnter={() => handleMapHover("region-2")}
                  onMouseLeave={handleMapLeave}
                />
                {/* Add more paths for other regions */}
              </g>
            </svg>
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
              <h3 className="font-bold text-primaryText">{hoveredRegion.region}</h3>
              <p>Male: {hoveredRegion.male}</p>
              <p>Female: {hoveredRegion.female}</p>
              <p>Total: {hoveredRegion.count}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
