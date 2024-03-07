import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config"

export const AuthContext = createContext()
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // create an account
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign up using gmail
    const signUpWithGmail = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // login using email and password
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // logout
    const logOut = () => {
        signOut(auth)
    }

    // update profile
    const updateUserProfile = ({ name, photoURL }) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        })
    }

    // check signed-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                setLoading(false)
            }
        });
        return () => unsubscribe();
    }, [])

    const authInfo = { user, createUser, signUpWithGmail, logIn, logOut, updateUserProfile }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}
