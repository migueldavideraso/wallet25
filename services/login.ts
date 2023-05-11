
import {
  ISingInProps,
  ISingUpProps,
  TUserCallback
} from "@/types/main"

import {
  singIn as singInFirebase,
  singUp as singUpFirebase,
  signOut as signOutFirebase,
  onAuthChanged as onAuthChangedFirebase
} from "./firebase/auth"

import { initFirebase } from "./firebase/main"


export function initApp () {
  return initFirebase()
}

export function onAuthChanged (callback: TUserCallback) {
  return onAuthChangedFirebase(callback)
}

export async function singIn (args: ISingInProps) {
  return await singInFirebase(args)
}

export async function singUp (args: ISingUpProps) {
  return await singUpFirebase(args)
}

export async function signOut () {
  return await signOutFirebase()
}
