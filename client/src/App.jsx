import React from 'react'
import Home from './pages/Home'
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register"
import './App.css'
import Header from './components/Header/Header';
import PageNotFound from './pages/PageNotFound';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;
