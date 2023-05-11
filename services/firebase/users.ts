import { IUser } from "@/types/data";
import { DocumentSnapshot, doc, setDoc } from "firebase/firestore";
import { getDB } from "./main";


interface ICreateUserArgs {
  id: string,
  name: string,
  email: string,
}

export async function createUser (args: ICreateUserArgs) {

  const userData:IUser = {
    ...args,
    phone: null,
    expense_value: 0,
    income_value: 0,
    total_value: 0,
    operations_count: 0,
  }

  await setDoc(doc(getDB(), `users/${args.id}`), userData)

  return userData
}

export function getUserByDoc (docUser: DocumentSnapshot): IUser {

  const docData = docUser.data() || {}
  const userData = {
    id: docUser.id,
    email: String(docData.email),
    name: String(docData.name),
    phone: String(docData.phone),
    expense_value: Number(docData.expense_value) || 0,
    income_value: Number(docData.income_value) || 0,
    total_value: Number(docData.total_value) || 0,
    operations_count: Number(docData.operations_count) || 0,
  }

  return userData
}

