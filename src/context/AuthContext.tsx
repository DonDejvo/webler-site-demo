import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    sendPasswordResetEmail,
    signInWithPopup,
    updatePassword,
    reauthenticateWithPopup,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { auth, } from "../services/firebase.config";
import User from "../views/User";
import DatabaseClient from "../api/DatabaseClient";

const googleProvider = new GoogleAuthProvider();
const AuthContext = React.createContext<any>({});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {

    const [currentUser, setCurrentUser] = useState<any>();

    async function signup(email: string, username: string, password: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await createUserIfNotExists(userCredential.user.uid, username);
        localStorage.setItem("username", username);
    }

    async function signin(email: string, password: string) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await DatabaseClient.getUser(userCredential.user.uid)
            .then(snapshot => {
                localStorage.setItem("username", snapshot.val().username);
            })
    }

    async function signWithGoogle() {
        const userCredential = await signInWithPopup(auth, googleProvider);
        await createUserIfNotExists(userCredential.user.uid, null);
    }

    async function signout() {
        await signOut(auth);
        localStorage.setItem("username", "");
    }

    function resetPassword(email: string) {
        return sendPasswordResetEmail(auth, email)
    }

    function changePassword(password: string) {
        return updatePassword(currentUser, password)
      }

      function reauthWithGoogle() {
        return reauthenticateWithPopup(currentUser, googleProvider)
    }

    function reauthWithCredential(password: string) {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        return reauthenticateWithCredential(currentUser, credential);
    }

    async function createUserIfNotExists(uid: string, username: string | null) {
        let snapshot = await DatabaseClient.getUser(uid)
        if (!snapshot.exists()) {
            if (username == null) {
                username = "User" + Date.now().toString() + Math.floor(Math.random() * 10).toString();
            }
            const user = new User(username);
            localStorage.setItem("username", username)
            await DatabaseClient.createUser(uid, user);
        }
        else {
            localStorage.setItem("username", snapshot.val().username)
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if(!user) {
                localStorage.setItem("username", "");
            }
        })
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        signin,
        signWithGoogle,
        signout,
        resetPassword,
        changePassword,
        reauthWithGoogle,
        reauthWithCredential
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}