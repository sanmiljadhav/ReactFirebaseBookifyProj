import { useState } from 'react'

//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


//Pages
import Register from './pages/Register';
//Components
import NavbarComp from './components/NavbarComp';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

// const auth = getAuth(app);

function App() {

  const signUpUser=()=>{
    createUserWithEmailAndPassword(auth, 'sanmil.dev@gmail.com', 'sammie12345').then((value)=>console.log(value))
  }
  

  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>

      </Routes>
      
       
      
      
    </>
  )
}

export default App
