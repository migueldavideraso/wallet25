
import { Icon } from "@/components/icons"


export interface IUser {
  id: string
  name: string|null
  email: string|null
  phone: string|null
  expense_value: number
  income_value: number
  operations_count: number
  total_value: number
}

export type TOperationsType = 'expense'|'income'

export function isValidOperationType (_type: any): _type is TOperationsType {
  return _type === 'income' || _type === 'expense'
}


export interface IOperation {
  date: Date
  id?: string
  name: string
  category: string
  amount: number
  createdAt: Date
  type: TOperationsType
}

export interface ICategory {
  type: TOperationsType
  name: string
  id: string
  Icon?: typeof Icon
}

export interface IMeasurement {
  id?: string
  date: Date
  expense_value: number
  income_value: number
  operations_count: number
  total_value: number
}

