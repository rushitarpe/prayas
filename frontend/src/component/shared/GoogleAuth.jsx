import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from '../../firebase'
import { signInSuccess } from "../../redux/user/userSlice"
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom'


const GoogleAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: "select_account" })
  
      try {
        const firebaseResponse = await signInWithPopup(auth, provider)
  
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: firebaseResponse.user.displayName,
            email: firebaseResponse.user.email,
            profilePhotoUrl: firebaseResponse.user.photoURL,
          }),
        })
  
        const data = await res.json()
  
        if (res.ok) {
          dispatch(signInSuccess(data))
          navigate("/")
        }
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
        
        <button
                type="submit"
                onClick={handleGoogleClick}
                className="w-full py-3 gap-3 bg-gradient-to-r
                 from-blue-500 to-purple-500 text-white
                  rounded-lg font-semibold hover:scale-105 transition-transform duration-300 animate-button-glow disabled:opacity-70 disabled:cursor-not-allowed"
              >
               Continue With Google
              </button>
    </div>
  )
}

export default GoogleAuth