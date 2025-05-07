"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { subMonths } from "date-fns";

import { useMockData } from "../hooks/use-mock-data";
import type { Department } from "../types/financial";
import DashboardHeader from "./dashboard-header";
import RevenueChart from "./charts/revenue-chart";
import ExpenseChart from "./charts/expense-chart";
import ProfitMarginChart from "./charts/profit-margin-chart";
import FinancialTable from "./financial-table";
import FilterControls from "./filter-controls";
import DataInputForm from "./data-input-form";

export default function Dashboard() {
  // Initialize with last 6 months date range
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(today, 6),
    to: today,
  });

  const [selectedDepartment, setSelectedDepartment] = useState<
    Department | "all"
  >("all");

  // Get mock financial data with filters applied
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, addFinancialData, isLoading, filteredData } = useMockData(
    dateRange,
    selectedDepartment
  );

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <FilterControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
          />

          <div className="lg:col-span-2">
            <DataInputForm onSubmit={addFinancialData} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <RevenueChart data={filteredData} isLoading={isLoading} />
          <ExpenseChart data={filteredData} isLoading={isLoading} />
          <ProfitMarginChart data={filteredData} isLoading={isLoading} />
        </div>

        <div className="mt-6">
          <FinancialTable data={filteredData} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
