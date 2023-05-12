
import { IOperation } from '@/types/data'
import { IGetOperationsArgs, IGetOperationsResult } from "@/types/main"

import {
  createOperation as createOperationFirebase,
  deleteOperation as deleteOperationFirebase,
  getOperation as getOperationFirebase,
  getOperations as getOperationsFirebase
} from './firebase/operations'

import {
  createOperation as createOperationMock,
  deleteOperation as deleteOperationMock,
  getOperation as getOperationMock,
  getOperations as getOperationsMock
} from './mocks/operations'


import { getUserType } from './login'

const USER_NOT_FOUND_ERROR = {
  status: 'error',
  result: 'user not found'
}

export async function getOperations (args: IGetOperationsArgs): Promise<IGetOperationsResult> {

  const userType = getUserType()

  if (userType === 'mock') {
    return getOperationsMock()
  }

  if (userType === 'firebase') {
    return await getOperationsFirebase(args)
  }

  const USER_NOT_FOUND_ERROR:IGetOperationsResult = {
    status: 'error',
    result: 'user not found'
  }

  return USER_NOT_FOUND_ERROR
}

export async function getOperation (id: string) {

  const userType = getUserType()

  if (userType === 'mock') {
    return getOperationMock(id)
  }

  if (userType === 'firebase') {
    return await getOperationFirebase(id)
  }

  return USER_NOT_FOUND_ERROR
}

export async function createOperation (operation: IOperation) {

  const userType = getUserType()

  if (userType === 'mock') {
    return createOperationMock(operation)
  }

  if (userType === 'firebase') {
    return await createOperationFirebase(operation)
  }

  return USER_NOT_FOUND_ERROR
}

export async function deleteOperation (id: string) {

  const userType = getUserType()

  if (userType === 'mock') {
    return deleteOperationMock(id)
  }

  if (userType === 'firebase') {
    return await deleteOperationFirebase(id)
  }

  return USER_NOT_FOUND_ERROR
}

