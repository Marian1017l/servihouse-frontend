import { useState } from 'react'
import './App.css'
import  Header from './components/dashboard/homepage/Header'
import {AppRoutes} from './routes/AppRoutes' 
function App() {
  return (
    <>
      <Header /> {/* El Header estará siempre visible */}
      <AppRoutes /> {/* Aquí se renderizan las rutas */}
    </>
  )
}

export default App
