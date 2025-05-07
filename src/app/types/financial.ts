export type Department = "sales" | "marketing" | "engineering" | "hr" | "operations"

export interface FinancialData {
  id: string
  date: Date
  department: Department
  revenue: number
  expenses: number
  profit: number
  profitMargin: number
}

export interface FinancialDataInput {
  date: Date
  department: Department
  revenue: number
  expenses: number
}
