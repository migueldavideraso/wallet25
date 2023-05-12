
import { IGetOperationsResult } from '@/types/main'
import { getUser, getUserId, setUser } from './auth'
import operationsData, {
  setDailyMeasurement,
  setAnnualMeasurement,
  getDailyMeasurement,
  getAnnualMeasurement,
} from './operations_data'
import { IOperation } from '@/types/data'
import { getMeasurementsData, getMeasurementsIds } from '../helpers/operations'


interface IoperationsObject {
  [id: string]: IOperation
}

const operationsObject:IoperationsObject = {}

operationsData.operations.forEach(operation => {

  if (operation.id != null) {
    operationsObject[operation.id] = operation
  }
})


export async function getOperations (): Promise<IGetOperationsResult> {

  const userId = getUserId()

  if (userId !== 'proof_user') {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  return {
    status: 'success',
    result: Object.values(operationsObject),
  }
}

type TGetOperationResult = (
  { status: 'success'; result: IOperation }
  |
  {
    status: 'error'
    result: 'unauthorized'|'operation not found'|'error getting operation'
  }
)

export async function getOperation (id: string): Promise<TGetOperationResult> {

  const userId = getUserId()
  const operation = operationsObject[id]

  if (userId !== 'proof_user' || operation == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  return { status: 'success', result: operation }
}


export async function createOperation (operation: IOperation) {

  const userId = getUserId()
  const userData = getUser()

  if (userId == null || userData == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  const id = (Math.random() * (10 ** 10)).toFixed()

  operation.id = id
  operationsObject[id] = operation

  const { dailyMesurementId, annualMesurementId } = getMeasurementsIds(operation)
  const dailyData = getDailyMeasurement(dailyMesurementId)
  const annualData = getAnnualMeasurement(annualMesurementId)

  const { dailyData: newDailyData, annualData: newAnnualData, newUserData } = getMeasurementsData({
    amount: operation.amount,
    type: operation.type,
    operations_count: 1,
    userData,
    dailyData,
    annualData,
  })

  setDailyMeasurement(newDailyData)
  setAnnualMeasurement(newAnnualData)
  setUser({ ...userData, ...newUserData })
  
  return {
    status: 'success',
    result: operation
  }
}




export async function deleteOperation (id: string) {

  const userId = getUserId()
  const userData = getUser()
  const operation = operationsObject[id]

  if (userId == null || userData == null || operation == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  const { dailyMesurementId, annualMesurementId } = getMeasurementsIds(operation)
  const dailyData = getDailyMeasurement(dailyMesurementId)
  const annualData = getAnnualMeasurement(annualMesurementId)

  const amount = operation.amount * -1
  const { dailyData: newDailyData, annualData: newAnnualData, newUserData } = getMeasurementsData({
    type: operation.type,
    operations_count: -1,
    amount,
    userData,
    dailyData,
    annualData,
  })

  setDailyMeasurement(newDailyData)
  setAnnualMeasurement(newAnnualData)
  setUser({ ...userData, ...newUserData })

  delete operationsObject[id]

  return {
    status: 'success',
    result: 'action done correctly'
  }
}


