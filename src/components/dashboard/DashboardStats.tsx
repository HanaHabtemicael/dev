"use client";

import { Users, UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Stat {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
}

interface DashboardStatsProps {
  data: {
    totalFarmers: number;
    newFarmers: number;
    maleFarmers: number;
    newMaleFarmers: number;
    femaleFarmers: number;
    newFemaleFarmers: number;
    totalAgents: number;
    newAgents: number;
  };
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const stats = [
    {
      title: "Total farmers",
      value: data.stats.totalFarmers || "0",
      subtitle: `${data.newFarmers || 0} newly added`,
      icon: Users,
    },
    {
      title: "Male Farmers",
      value: data.stats.maleFarmers || "0",
      subtitle: `${data.newMaleFarmers || 0} newly added`,
      icon: Users,
    },
    {
      title: "Female Farmers",
      value: data.stats.femaleFarmers || "0",
      subtitle: `${data.newFemaleFarmers || 0} newly added`,
      icon: Users,
    },
    {
      title: "Total Agents",
      value: data.stats.totalAgents || "0",
      subtitle: `${data.newAgents || 0} newly added`,
      icon: UserCog,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-primaryText">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="flex items-center justify-between p-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </div>
            <stat.icon className="h-8 w-8 text-green-600" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
