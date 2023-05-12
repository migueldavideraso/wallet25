
import {
  IUser,
} from "@/types/data"

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

import {
  onAuthChanged as onAuthChangedMock,
  signIn as signInMock,
  signOut as signOutMock,
} from './mocks/auth'


import { initFirebase } from "./firebase/main"


type TUserType = null|'firebase'|'mock'

let userType:TUserType = null

export function getUserType ():TUserType {
  return userType
}


export function initApp () {
  return initFirebase()
}

export function onAuthChanged (callback: TUserCallback) {

  let user: IUser|null = null

  function __callback (type: TUserType, newUser: IUser|null) {

    // Si el usuario ya tiene sesion iniciada en firebase
    if (userType == null && newUser != null && user == null) {
      userType = 'firebase'
    }

    // No permitir inicio de sesion si ya hay un usuario existente
    if (user !== null && newUser !== null) {
      callback(user)
      return
    }

    // Cerrar sesion del usuario
    if (user !== null && newUser == null && type === userType) {
      user = null
      callback(null)
      return
    }

    // Iniciar Sesion
    if (user === null && newUser !== null) {
      user = newUser
      callback(user)
      return
    }

    callback(user)
  } 

  const unsubscribes = [
    onAuthChangedFirebase((user) => __callback('firebase', user)),
    onAuthChangedMock((user) => __callback('mock', user)),
  ]
  return () => unsubscribes.forEach(fn => fn())
}

export async function singIn (args: ISingInProps|null) {

  // No permitir inicio de sesion si ya hay un usuario existente
  if (userType !== null) {
    return null
  }

  if (args == null) {
    userType = 'mock'
    signInMock()
    return null
  }
  else {

    const user = await singInFirebase(args)

    if (user != null) {
      userType = 'firebase'
    }

    return user
  }
}

export async function singUp (args: ISingUpProps) {
  return await singUpFirebase(args)
}

export async function signOut () {

  if (userType === 'firebase') {
    await signOutFirebase()
  }
  else if (userType === 'mock') {
    signOutMock()
  }

  userType = null
}
