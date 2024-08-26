import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb7NI7nB01rqwfmXQYINLMuvnBgMVTm8o",
  authDomain: "fir-firstpro-dcfda.firebaseapp.com",
  projectId: "fir-firstpro-dcfda",
  storageBucket: "fir-firstpro-dcfda.appspot.com",
  messagingSenderId: "655480139472",
  appId: "1:655480139472:web:36d0f1444f1e6e6344f8d5"
};

// Initialize Firebase and Firebase Auth
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

// Create a Firebase context
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = ({ children }) => {
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      const user = userCredential.user;
      console.log('User:', user);
      return user;
    } catch (error) {
      console.error("Error Code:", error.code);
      console.error("Error Message:", error.message);
      throw error; // Re-throw the error so that the calling component can handle it
    }
  };

  return (
    <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword }}>
      {children}
    </FirebaseContext.Provider>
  );
};
