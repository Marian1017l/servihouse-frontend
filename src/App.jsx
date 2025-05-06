import { useState } from 'react'
import './App.css'
import  Header from './components/dashboards/homepage/Header'
import  Footer from './components/dashboards/homepage/Footer'
import {AppRoutes} from './routes/AppRoutes' 
function App() {
  return (
    <div className="app-container"> {/* Contenedor principal con Flexbox */}
      <Header /> {/* El Header estará siempre visible en la parte superior */}
      <main className="main-content">
        <AppRoutes /> {/* Aquí se renderizan las rutas */}
      </main>
      <Footer /> {/* El Footer estará siempre visible en la parte inferior */}
    </div>
  );
}

export default App;
