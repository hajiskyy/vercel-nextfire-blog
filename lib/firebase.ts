import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCTKWY-sBoJ01xM42WtzHMACyV7WFZz8rI",
  authDomain: "nextfire-b431e.firebaseapp.com",
  projectId: "nextfire-b431e",
  storageBucket: "nextfire-b431e.appspot.com",
  messagingSenderId: "571322772281",
  appId: "1:571322772281:web:a03849fbb1648a571296e8",
  measurementId: "G-8SRVXD5PF1",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp

// Helpers

/**
 * Get /{user}/usernaem
 * @param {string} username
 */
export const getUserWithUsername = async (username) => {
  const usersRef = firestore.collection("users")
  const query = usersRef.where("username", "==", username).limit(1)
  const userDoc = (await query.get()).docs[0]
  return userDoc
}

/**
 * Converts a firestore docuemnt to JSON
 * @param {DocumentSnapshot} doc
 */
export const postToJSON = (doc) => {
  const data = doc.data()
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}
