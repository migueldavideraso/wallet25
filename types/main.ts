import { IOperation, IUser, TOperationsType } from "./data"


export type TUserCallback = (user: IUser|null) => void


export type TResponseType = 'success'|'error'

export interface IGetOperationsArgs {
  filter: 'all'|TOperationsType
}

export interface IGetOperationsResult {
  result: IOperation[]|string
  status: TResponseType
}

export interface ICreateOperationResult {
  result: IOperation|string
  status: TResponseType
}

export interface ISingInProps {
  email: string
  password: string
}

export interface ISingUpProps {
  name: string
  email: string
  password: string
}

