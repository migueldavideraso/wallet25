
import authData from './auth.json'
import { createStore } from "@/helpers/store";
import { IUser } from "@/types/data";


type TStore = IUser|null

const store = createStore<TStore>(null)


export function getUserId (): string|null {
  return store.get()?.id || null
}

export function getUser (): IUser|null {
  return store.get()
}

export function onAuthChanged(callback: (value: TStore) => void) {
  return store.subscribe(callback)
}

export function signIn () {
  store.set(authData.user)
}

export function signOut () {
  store.set(null)
}

export function setUser (user: IUser) {
  store.set(user)
}
