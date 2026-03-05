import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from "./components/jsx/login.jsx"


import './App.css'
import Overview from './pages/jsx/overview.jsx'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/overview" element={<Overview />} />

   </Routes>
    
   </BrowserRouter>
  )
}

export default App
