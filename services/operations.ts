
import { IOperation } from '@/types/data'
import { IGetOperationsArgs, IGetOperationsResult } from "@/types/main"

import {
  createOperation as createOperationFirebase,
  deleteOperation as deleteOperationFirebase,
  getOperation as getOperationFirebase,
  getOperations as getOperationsFirebase
} from './firebase/operations'


export async function getOperations (args: IGetOperationsArgs): Promise<IGetOperationsResult> {
  return await getOperationsFirebase(args)
}

export async function getOperation (id: string) {
  return await getOperationFirebase(id)
}

export async function createOperation (operation: IOperation) {
  return await createOperationFirebase(operation)
}

export async function deleteOperation (id: string) {
  return await deleteOperationFirebase(id)
}

