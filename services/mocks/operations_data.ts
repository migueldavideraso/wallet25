import { IMeasurement, IOperation } from "@/types/data"




const operations: IOperation[] = [
  {
    id: '1',
    amount: 1500,
    category: 'salary',
    createdAt: new Date(),
    date: new Date(),
    name: 'Income Operation',
    type: 'income',
  },
  {
    id: '2',
    amount: 1000,
    category: 'purchase',
    createdAt: new Date(),
    date: new Date(),
    name: 'Expense Operation',
    type: 'expense',
  }
]

const daily_measurements: IMeasurement[] = [
  {
    id: new Date().toISOString().slice(0, 10),
    date: new Date(),
    total_value: 500,
    income_value: 1500,
    expense_value: 1000,
    operations_count: 2,
  }
]

const annual_measurements: IMeasurement[] = [
  {
    id: String(new Date().getFullYear()),
    date: new Date(),
    total_value: 500,
    income_value: 1500,
    expense_value: 1000,
    operations_count: 2,
  }
]

interface IMeasurementsObject {
  [id: string]: IMeasurement
}

const annualMesuremensObject:IMeasurementsObject = {}
const dailyMesuremensObject:IMeasurementsObject = {}

annual_measurements.forEach(measurement => {
  measurement.id && (annualMesuremensObject[measurement.id] = measurement)
})

daily_measurements.forEach(measurement => {
  measurement.id && (dailyMesuremensObject[measurement.id] = measurement)
})

export function setAnnualMeasurement(measurement: IMeasurement) {
  measurement.id && (annualMesuremensObject[measurement.id] = measurement)
}

export function setDailyMeasurement(measurement: IMeasurement) {
  measurement.id && (dailyMesuremensObject[measurement.id] = measurement)
}

export function getAnnualMeasurement(id: string): IMeasurement {

  if (annualMesuremensObject[id]) {
    return annualMesuremensObject[id]
  }

  const date = new Date(`${id}-1-1`)

  return {
    id,
    date,
    total_value: 0,
    income_value: 0,
    expense_value: 0,
    operations_count: 0,
  }
}

export function getDailyMeasurement(id: string): IMeasurement {

  if (dailyMesuremensObject[id]) {
    return dailyMesuremensObject[id]
  }

  const date = new Date(id)

  return {
    id,
    date,
    total_value: 0,
    income_value: 0,
    expense_value: 0,
    operations_count: 0,
  }
}


export default {
  operations,
}