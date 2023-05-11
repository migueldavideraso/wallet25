
import { FirebaseApp, initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { Firestore } from "firebase/firestore"

import {
  getAuth as getFirebaseAuth,
  Auth
} from "firebase/auth"


let app: FirebaseApp
let db: Firestore
let auth: Auth

export function initFirebase () {

  const firebaseConfig = {
    apiKey: "AIzaSyBcvXY-9dSc7d9AawbUuhrXKiEFW5Kp0Sc",
    authDomain: "wallet25-463ca.firebaseapp.com",
    projectId: "wallet25-463ca",
    storageBucket: "wallet25-463ca.appspot.com",
    messagingSenderId: "792012981428",
    appId: "1:792012981428:web:924ae6ef6827c6a78243e1",
    measurementId: "G-6QLFFL99EC"
  }
  
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  auth = getFirebaseAuth(app)
}

export function getDB (): Firestore {
  return db
}

export function getAuth (): Auth {
  return auth
}

