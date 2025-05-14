import { useState } from 'react'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'
function App() {
  return (
    <div className="app-container"> {/* Contenedor principal con Flexbox */}
      <main className="main-content">
        <AppRoutes /> {/* Aquí se renderizan las rutas */}
      </main>
    </div>
  );
}

export default App;
