

import { useEffect, useState } from "react"

export interface Istore<TValue> {
  subscribe: (value: TObserver<TValue>) => () => void,
  set: (value: TValue) => void,
  get: () => TValue,
}

export type TObserver<TValue> = (value: TValue) => void 


export function createStore<TValue> (initialValue: TValue): Istore<TValue> {


  let value = initialValue
  let observers:Array<TObserver<TValue>> = []

  const subscribe = (observer: TObserver<TValue>) => {

    if (typeof observer !== 'function') {
      throw new Error('The parameter must be a function')
    }

    observers.push(observer)
    dispatch(observer)
    return () => {
      observers = observers.filter(o => o !== observer)
    }
  }

  const set = (argument: TValue) => {

    if (typeof argument === 'function') {
      value = argument(value)
    }
    else {
      value = argument
    }

    value = structuredClone(value)
    observers.forEach((fn) => dispatch(fn))
  }

  const get = () => {
    return structuredClone(value)
  }

  const dispatch = (fn: TObserver<TValue>) => {
    fn(structuredClone(value))
  }

  return {
    subscribe,
    set,
    get,
  }
}


export function useStore<TValue> (store: Istore<TValue>) {

  const [ state, setState ] = useState(store.get())

  useEffect(() => {

    const unsubscribe = store.subscribe(newState => {
      if (newState !== state) {
        setState(newState)
      }
    })

    return () => {
      unsubscribe()
    }

  }, [ state ])

  return [ state, store.set ]
}

