"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FarmerRegistrationChartProps {
  data: {
    labels: string[]; // Array of labels in different formats: week ["Mon", "Tue"], month ["YYYY-MM-DD"], year ["YYYY-MM"]
    data: number[]; // Array of data values corresponding to the labels
  };
  view: "week" | "month" | "year"; // Current view type
}

export function FarmerRegistrationChart({
  data,
  view,
}: FarmerRegistrationChartProps) {
  const views = data?.period

  // Transform data based on the view type
  const chartData = data.labels.map((label, index) => {
    let formattedLabel = "";

    if (views === "week") {
      // For weekly data, labels remain the same
      formattedLabel = label;
    } else if (views === "month") {
      // Convert "YYYY-MM-DD" to day (e.g., "01", "02")
      const date = new Date(label);
      if (!isNaN(date.getTime())) {
        formattedLabel = date.getDate().toString().padStart(2, "0");
      } else {
        console.warn(`Invalid date format for label: ${label}`);
      }
    } else if (views === "year") {
      // Convert "YYYY-MM" to month name (e.g., "Jan", "Feb")
      const date = new Date(`${label}-01`);
      if (!isNaN(date.getTime())) {
        formattedLabel = date.toLocaleString("default", { month: "short" });
      } else {
        console.warn(`Invalid date format for label: ${label}`);
      }
    }

    return {
      label: formattedLabel,
      value: data.data[index],
    };
  });

  // Log transformed data for debugging
  console.log("Transformed chart data:", data?.period);
  console.log("Transformed chart :", views);


  // Determine chart title dynamically
  const chartTitle =
    views == "week"
      ? "This Week Farmer Registrations"
      : views === "month"
      ? "This Month Farmer Registrations"
      : "This Year Farmer Registrations";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primaryText">{chartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
              <XAxis dataKey="label"  /> {/* Ensure dataKey is "label" */}
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#228D4D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
