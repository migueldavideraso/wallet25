

import { IMeasurement, IOperation, IUser, TOperationsType } from "@/types/data"




export function getMeasurementsIds (operation: IOperation) {

  const year = operation.date.getFullYear()
  const month = operation.date.getMonth()
  const day = operation.date.getDate()

  const annualMesurementId: string = `${year}`
  const dailyMesurementId: string = `${year}-${month + 1}-${day}`

  return {
    annualMesurementId,
    dailyMesurementId
  }
}




interface IGetMeasurementsDataArgs {

  type: TOperationsType
  amount: number
  operations_count: number
  
  userData: IUser
  dailyData: IMeasurement
  annualData: IMeasurement
}


export function getMeasurementsData (args: IGetMeasurementsDataArgs) {

  const {
    type,
    amount,
    operations_count,
    userData,
    dailyData,
    annualData,
  } = args

  const totalValue = type === 'expense' ? amount * -1 : amount
  const newUserData = {
    total_value: userData.total_value,
    expense_value: userData.expense_value,
    income_value: userData.income_value,
    operations_count: userData.operations_count,
  }

  annualData.total_value += totalValue
  dailyData.total_value += totalValue
  newUserData.total_value += totalValue

  // Actualizar datos de los medidores
  if (type === 'expense') {
    annualData.expense_value += amount
    dailyData.expense_value += amount
    newUserData.expense_value += amount
  }
  else {
    annualData.income_value += amount
    dailyData.income_value += amount
    newUserData.income_value += amount
  }

  dailyData.operations_count += operations_count
  annualData.operations_count += operations_count
  newUserData.operations_count += operations_count

  return {
    dailyData,
    annualData,
    newUserData,
  }
}
