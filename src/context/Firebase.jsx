import React, { useEffect } from 'react'

import { createContext, useContext, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth";

const FirebaseContext = createContext(null)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAb7NI7nB01rqwfmXQYINLMuvnBgMVTm8o",
    authDomain: "fir-firstpro-dcfda.firebaseapp.com",
    projectId: "fir-firstpro-dcfda",
    storageBucket: "fir-firstpro-dcfda.appspot.com",
    messagingSenderId: "655480139472",
    appId: "1:655480139472:web:36d0f1444f1e6e6344f8d5"
  };

export const useFirebase = ()=>useContext(FirebaseContext);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

//Initialize Firebase Auth
export const firebaseAuth = getAuth(firebaseApp);

//Initialize Google Provider
export const googleProvider = new GoogleAuthProvider();


export const FirebaseProvider = (props) =>{

  const [user,setUser] = useState(null)

  useEffect(() => {

    //Checking the User state after login and logout

    onAuthStateChanged(firebaseAuth, (user)=>{
      console.log('User from Context', user)
      if(user){
        setUser(user)

      }else{
        setUser(null)
      }
    })
    
  }, [])
  

    const signupUserWithEmailAndPassword = (email, password)=>{
        return createUserWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          return user
          
        })
        .catch((error) => {
          throw error
        });

    }


    const signinUserWithEmailAndPassword = (email, password)=>{
      return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('User is from login', user)
        return user
        
      })
      .catch((error) => {
        throw error
      });

  }

  
  const signInWithGoogle = ()=>{
    return signInWithPopup(firebaseAuth, googleProvider)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log('User is from login', user)
      return user
      
    })
    .catch((error) => {
      throw error
    });

}

    const isLoggedIn = user ? true : false;

    return <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signInWithGoogle, isLoggedIn}}>{props.children}</FirebaseContext.Provider>

}


