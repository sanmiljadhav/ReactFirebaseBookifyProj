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
import ListingPage from './pages/ListingPage';
import Home from './pages/Home';

// const auth = getAuth(app);

function App() {

  
  

  return (
    <>
      <NavbarComp/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/book/list' element={<ListingPage/>} />

      </Routes>
      
       
      
      
    </>
  )
}

export default App
