import React, { useEffect } from "react";

import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

const FirebaseContext = createContext(null);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb7NI7nB01rqwfmXQYINLMuvnBgMVTm8o",
  authDomain: "fir-firstpro-dcfda.firebaseapp.com",
  projectId: "fir-firstpro-dcfda",
  storageBucket: "fir-firstpro-dcfda.appspot.com",
  messagingSenderId: "655480139472",
  appId: "1:655480139472:web:36d0f1444f1e6e6344f8d5",
};

export const useFirebase = () => useContext(FirebaseContext);

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

//Initialize Firebase Auth
export const firebaseAuth = getAuth(firebaseApp);

//Initialize Google Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const firestoreDb = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp, "gs://fir-firstpro-dcfda.appspot.com");

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //Checking the User state after login and logout

    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("User from Context", user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        return user;
      })
      .catch((error) => {
        throw error;
      });
  };

  const signinUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User is from login", user);
        return user;
      })
      .catch((error) => {
        throw error;
      });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleProvider)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User is from login", user);
        return user;
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleCreateNewListing = async (
    bookName,
    isbnNumber,
    price,
    coverPic
  ) => {
    //Photos always go in the bucket but its path will always go in firestore

    try {
      console.log("Cover pic name is", coverPic);
      console.log("Cover pic name is", coverPic.name);

      const imageRef = ref(
        storage,
        `uploads/images/${Date.now()}-${coverPic.name}`
      );
      const uploadFilePath = await uploadBytes(imageRef, coverPic);
      return await addDoc(collection(firestoreDb, "books"), {
        bookName,
        isbnNumber,
        price,
        imageURL: uploadFilePath.ref.fullPath,
        userID: user.uid,
        userEmail: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });

      //uploadFilePath contains the path of the uploaded file
    } catch (error) {

      throw error; 

    }
  };


  const listAllBooks = async () =>{

    try{
      return await getDocs(collection(firestoreDb,'books'))

    }catch(error){
      throw error

    }

    
  }

  //path denge image ka jo humare DB me hai
  const getImageURL = (path)=>{
    return getDownloadURL(ref(storage, path))

  }

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signInWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
