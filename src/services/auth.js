import { firebaseAuth } from '@/.firebase'

export const authSignUp = async (email, password) => {
  try {
    return await firebaseAuth.createUserWithEmailAndPassword(email, password)
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const authSignIn = async (email, password) => {
  try {
    return await firebaseAuth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const authSignOut = async () => {
  try {
    await firebaseAuth.signOut()
  } catch (error) {
    console.error(error.code, error.message)
  }
}

export const getCurrentUser = () => firebaseAuth.currentUser
