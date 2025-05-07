import { format, subMonths } from "date-fns"
import type { Department, FinancialData } from '../types/financial'

// Departments
const departments: Department[] = ["sales", "marketing", "engineering", "hr", "operations"]

// Generate random number between min and max
function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Generate mock financial data for the past 6 months
export function generateMockData(): FinancialData[] {
  const data: FinancialData[] = []
  const today = new Date()

  // Generate data for each department for each month
  for (let i = 6; i >= 0; i--) {
    const date = subMonths(today, i)

    departments.forEach((department) => {
      // Generate random revenue and expenses based on department
      let baseRevenue = 0
      let baseExpenses = 0

      switch (department) {
        case "sales":
          baseRevenue = randomNumber(80000, 120000)
          baseExpenses = randomNumber(40000, 70000)
          break
        case "marketing":
          baseRevenue = randomNumber(50000, 80000)
          baseExpenses = randomNumber(30000, 60000)
          break
        case "engineering":
          baseRevenue = randomNumber(100000, 150000)
          baseExpenses = randomNumber(70000, 110000)
          break
        case "hr":
          baseRevenue = randomNumber(20000, 40000)
          baseExpenses = randomNumber(15000, 35000)
          break
        case "operations":
          baseRevenue = randomNumber(60000, 90000)
          baseExpenses = randomNumber(40000, 70000)
          break
      }

      // Add some monthly variation
      const monthFactor = 1 + (Math.random() * 0.2 - 0.1) // +/- 10%
      const revenue = Math.round(baseRevenue * monthFactor)
      const expenses = Math.round(baseExpenses * monthFactor)
      const profit = revenue - expenses
      const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0

      data.push({
        id: `${department}-${format(date, "yyyy-MM")}-${Math.random().toString(36).substring(2, 9)}`,
        date,
        department,
        revenue,
        expenses,
        profit,
        profitMargin,
      })
    })
  }

  return data
}
