"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", value: 6000 },
  { month: "Feb", value: 1000 },
  { month: "Mar", value: 13000 },
  { month: "Apr", value: 3500 },
  { month: "May", value: 10500 },
  { month: "Jun", value: 22000 },
  { month: "Jul", value: 13000 },
  { month: "Aug", value: 9000 },
  { month: "Sep", value: 22000 },
  { month: "Oct", value: 12000 },
  { month: "Nov", value: 18000 },
  { month: "Dec", value: 4000 },
];

export function FarmerRegistrationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primaryText">Monthly Farmer Registrations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}