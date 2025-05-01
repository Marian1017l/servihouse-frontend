import { useState } from 'react'
import './App.css'
import  Header from './components/dashboard/homepage/Header'
import  Footer from './components/dashboard/homepage/Footer'
import {AppRoutes} from './routes/AppRoutes' 
function App() {
  return (
    <>
      <Header /> {/* El Header estará siempre visible */}
      <main className='main'>
        <AppRoutes /> {/* Aquí se renderizan las rutas */}
      </main>
      <Footer /> {/* El Footer estará siempre visible */}
    </>
  )
}

export default App;
