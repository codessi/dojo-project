import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { projectStorage } from '../firebase/config'
import { projectFirestore } from '../firebase/config'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password, displayName, thumbNail) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      const path = `/thumbNail/${res.user.uid}/${thumbNail.name}`
      const img = await projectStorage.ref(path).put(thumbNail)
      const imgUrl = await img.ref.getDownloadURL()

      // add display name to user
     await res.user.updateProfile({ displayName, photoURL: imgUrl })
    await projectFirestore.collection('user').doc(res.user.uid).set({
      online: true,
      displayName,
      photoURL:imgUrl
    })


      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}