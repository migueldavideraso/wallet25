
import { IUser } from "@/types/data"
import { ISingInProps, ISingUpProps, TUserCallback } from "@/types/main"

import { createUser, getUserByDoc } from "./users"
import { doc, getDoc } from 'firebase/firestore'
import { getAuth, getDB } from "./main"

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth"



export function getUserId (): string|null {
  return getAuth().currentUser?.uid || null
}


export function onAuthChanged (callback: TUserCallback) {

  return onAuthStateChanged(getAuth(), async (user) => {

    if (!user) {
      callback(null)
    }
    else {

      const userId = user.uid
      const docUser = await getDoc(doc(getDB(), `users/${userId}`))
      const userData = getUserByDoc(docUser)

      callback(userData)
    }
  })
}


export async function signOut () {
  await signOutFirebase(getAuth())
}


export async function singIn (args: ISingInProps) {

  try {

    const { email, password } = args
    const userCredential = await signInWithEmailAndPassword(getAuth(), email, password)
    const { user } = userCredential

    const userData = {
      id: user.uid,
      email: user.email,
      name: user.displayName,
      phone: user.phoneNumber,
    }

    return userData
  }
  catch(e: any) {
    return null
  }
}

export async function singUp (args: ISingUpProps): Promise<IUser|null> {

  try {

    const { email, password, name } = args
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
    const id = userCredential.user.uid

    const userData = await createUser({
      id,
      name,
      email,
    })

    return userData
  }
  catch(e: any) {
    return null
  }
}
