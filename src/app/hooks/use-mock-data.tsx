"use client";

import { useState, useEffect, useMemo } from "react";
import type { DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";

import type {
  Department,
  FinancialData,
  FinancialDataInput,
} from "../types/financial";
import { generateMockData } from "../lib/mock-data";

export function useMockData(
  dateRange: DateRange | undefined,
  selectedDepartment: Department | "all"
) {
  const [data, setData] = useState<FinancialData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial mock data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = generateMockData();
        setData(mockData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on date range and department
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.filter((item) => {
      // Filter by date range
      const dateInRange =
        dateRange?.from && dateRange?.to
          ? isWithinInterval(new Date(item.date), {
              start: dateRange.from,
              end: dateRange.to,
            })
          : true;

      // Filter by department
      const departmentMatch =
        selectedDepartment === "all" || item.department === selectedDepartment;

      return dateInRange && departmentMatch;
    });
  }, [data, dateRange, selectedDepartment]);

  // Function to add new financial data
  const addFinancialData = (newData: FinancialDataInput) => {
    const profit = newData.revenue - newData.expenses;
    const profitMargin =
      newData.revenue > 0 ? (profit / newData.revenue) * 100 : 0;

    const financialData: FinancialData = {
      id: `${Date.now()}`,
      date: newData.date,
      department: newData.department,
      revenue: newData.revenue,
      expenses: newData.expenses,
      profit,
      profitMargin,
    };

    setData((prevData) => [...prevData, financialData]);
  };

  return { data, filteredData, addFinancialData, isLoading };
}
