
import { ICreateOperationResult, IGetOperationsArgs, IGetOperationsResult } from "@/types/main"
import { IMeasurement, IOperation, IUser, TOperationsType } from "@/types/data"

import {
  doc,
  limit,
  where,
  query,
  addDoc,
  getDocs,
  orderBy,
  collection,
  runTransaction,
  QueryConstraint,
  DocumentSnapshot,
  getDoc,
} from "firebase/firestore"

import { getDB } from "./main"
import { getUserId } from "./auth"
import { getUserByDoc } from "./users"
import { getDate } from "@/helpers/main"
import { getMeasurementByDoc } from "./measurements"
import { getMeasurementsData, getMeasurementsIds } from "../helpers/operations"




export async function getOperations (args: IGetOperationsArgs): Promise<IGetOperationsResult> {

  const userId = getUserId()

  if (userId == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  try {

    const queries:QueryConstraint[] = []

    queries.push(orderBy('createdAt', 'desc'))
    queries.push(limit(20))

    if (args.filter !== 'all') {
      queries.push(where("type", "==", args.filter))
    }
  
    const result = await getDocs(query(collection(getDB(), `users/${userId}/operations`), ...queries))
    const operations:IOperation[] = result.docs.map(getOperationByDoc)

    return {
      result: operations,
      status: 'success'
    }
  }
  catch (e: any) {
    return {
      result: 'error getting operations',
      status: 'error'
    }
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

  if (userId == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  try {

    const operationDoc = await getDoc(doc(getDB(), `users/${userId}/operations/${id}`))
    
    if (!operationDoc.data()) {
      return {
        result: 'operation not found',
        status: 'error'
      }
    }

    const operation:IOperation = getOperationByDoc(operationDoc)

    return {
      result: operation,
      status: 'success'
    }
  }
  catch (e: any) {
    return {
      result: 'error getting operation',
      status: 'error'
    }
  }
}


function getOperationByDoc (doc: DocumentSnapshot): IOperation {

  const operation = doc.data() || {}

  return {
    createdAt: getDate(operation.createdAt),
    date: getDate(operation.date),
    id: doc.id,
    name: operation.name,
    category: operation.category,
    type: operation.type,
    amount: operation.amount,
  }
}



export async function createOperation (operation: IOperation) {

  const userId = getUserId()

  if (userId == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  try {

    const { annualMesuremenDocRef, dailyMesuremenDocRef } = getMeasurementsDocs(operation, userId)
    const userDocRef = doc(getDB(), `users/${userId}`)

    const operationId = await runTransaction(getDB(), async (transaction) => {

      // Obtener datos de los medidores
      const [ userDoc, annualMesuremenDoc, dailyMesuremenDoc ] = await Promise.all([
        transaction.get(userDocRef),
        transaction.get(annualMesuremenDocRef),
        transaction.get(dailyMesuremenDocRef),
      ])

      const { amount } = operation
      const annualData = getMeasurementByDoc(annualMesuremenDoc) 
      const dailyData = getMeasurementByDoc(dailyMesuremenDoc) 
      const userData = getUserByDoc(userDoc)


      // Crear operación
      const collref = collection(getDB(), `users/${userId}/operations`)
      const operationDoc = await addDoc(collref, operation)
      const id = operationDoc.id

      const { dailyData: newDailyData, annualData: newAnnualData, newUserData } = getMeasurementsData({
        type: operation.type,
        operations_count: 1,
        amount,
        userData,
        dailyData,
        annualData,
      })
      
      transaction.set(annualMesuremenDocRef, newAnnualData)
      transaction.set(dailyMesuremenDocRef, newDailyData)
      transaction.update(userDocRef, newUserData)

      return id
    });

    operation.id = operationId

    return {
      status: 'success',
      result: operation
    }
  }
  catch(e) {

    return {
      status: 'error',
      result: 'error creating operation'
    }
  }
}




export async function deleteOperation (id: string) {

  const userId = getUserId()

  if (userId == null) {
    return {
      status: 'error',
      result: 'unauthorized'
    }
  }

  try {

    const userDocRef = doc(getDB(), `users/${userId}`)
    const operationDocRef = doc(getDB(), `users/${userId}/operations/${id}`)
    const operation = getOperationByDoc(await getDoc(operationDocRef))

    const { annualMesuremenDocRef, dailyMesuremenDocRef } = getMeasurementsDocs(operation, userId)

    await runTransaction(getDB(), async (transaction) => {

      // Obtener datos de los medidores
      const [ userDoc, annualMesuremenDoc, dailyMesuremenDoc ] = await Promise.all([
        transaction.get(userDocRef),
        transaction.get(annualMesuremenDocRef),
        transaction.get(dailyMesuremenDocRef),
      ])

      const amount = operation.amount * -1
      const annualData = getMeasurementByDoc(annualMesuremenDoc) 
      const dailyData = getMeasurementByDoc(dailyMesuremenDoc) 
      const userData = getUserByDoc(userDoc)

      const { dailyData: newDailyData, annualData: newAnnualData, newUserData } = getMeasurementsData({
        type: operation.type,
        operations_count: -1,
        amount,
        userData,
        dailyData,
        annualData,
      })

      transaction.set(annualMesuremenDocRef, newAnnualData)
      transaction.set(dailyMesuremenDocRef, newDailyData)
      transaction.update(userDocRef, newUserData)
      transaction.delete(operationDocRef)
    });

    return {
      status: 'success',
      result: 'action done correctly'
    }
  }
  catch(e) {

    return {
      status: 'error',
      result: 'error deleting operation'
    }
  }
}




function getMeasurementsDocs (operation: IOperation, userId: string) {

  const { dailyMesurementId, annualMesurementId } = getMeasurementsIds(operation)

  const annualMesuremenDocRef = doc(getDB(), `users/${userId}/annual_measurements/${annualMesurementId}`)
  const dailyMesuremenDocRef = doc(getDB(), `users/${userId}/daily_measurements/${dailyMesurementId}`)

  return { annualMesuremenDocRef, dailyMesuremenDocRef }
}


