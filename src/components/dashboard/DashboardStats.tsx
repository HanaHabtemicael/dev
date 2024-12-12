"use client";

import { Users, UserCog } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total farmers",
    value: "276",
    subtitle: "8 newly added",
    icon: Users,
  },
  {
    title: "Male Farmers",
    value: "56",
    subtitle: "6 newly added",
    icon: Users,
  },
  {
    title: "Total farmers",
    value: "276",
    subtitle: "8 newly added",
    icon: Users,
  },
  {
    title: "Total Agents",
    value: "100",
    subtitle: "8 newly added",
    icon: UserCog,
  },
];

export function DashboardStats() {
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