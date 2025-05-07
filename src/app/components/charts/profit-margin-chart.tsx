"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { FinancialData } from "../../types/financial";

interface ProfitMarginChartProps {
  data: FinancialData[];
  isLoading: boolean;
}

export default function ProfitMarginChart({
  data,
  isLoading,
}: ProfitMarginChartProps) {
  const chartData = useMemo(() => {
    // Group by department and calculate profit margins
    const departmentData = data.reduce(
      (acc, item) => {
        if (!acc[item.department]) {
          acc[item.department] = {
            name: item.department,
            revenue: 0,
            expenses: 0,
            profit: 0,
            profitMargin: 0,
          };
        }

        acc[item.department].revenue += item.revenue;
        acc[item.department].expenses += item.expenses;

        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          revenue: number;
          expenses: number;
          profit: number;
          profitMargin: number;
        }
      >
    );

    // Calculate profit and profit margin
    Object.values(departmentData).forEach((dept) => {
      dept.profit = dept.revenue - dept.expenses;
      dept.profitMargin =
        dept.revenue > 0 ? (dept.profit / dept.revenue) * 100 : 0;
    });

    // Convert to array and capitalize department names
    return Object.values(departmentData).map((dept) => ({
      ...dept,
      name: dept.name.charAt(0).toUpperCase() + dept.name.slice(1),
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profit Margins</CardTitle>
        <CardDescription>Profit margins by department</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${value}%`}
                  domain={[-20, 100]}
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toFixed(2)}%`,
                    "Profit Margin",
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="profitMargin"
                  fill="#82ca9d"
                  name="Profit Margin (%)"
                  label={{
                    position: "top",
                    formatter: (value: number) => `${value.toFixed(1)}%`,
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
