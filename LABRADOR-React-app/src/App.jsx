import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from "./components/jsx/login.jsx"
import Overview from "./pages/jsx/overview.jsx"

import './App.css'

function App() {
  return (
   <>
   <div>
    
    <Overview/>
    <Login/>
   </div>
   </>
  )
}

export default App
