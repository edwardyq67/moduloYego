import './App.css';
import React, { useState, lazy, Suspense } from 'react'; // Importa lazy y Suspense
import { HashRouter, Route, Routes } from 'react-router-dom';
import ModalInstanciaQR from './comunicaciones/modal/ModalInstanciaQR';

// Carga dinámica de componentes
const Login = lazy(() => import('./Login/Login'));
const Modulo = lazy(() => import('./pages/Modulo'));
const Sibar = lazy(() => import('./pages/Sibar'));

function App() {
  // Estado para controlar si la barra lateral está expandida o contraída
  const [pixelesSiber, setPixelSiber] = useState(true);
  const [siberNav,SetSiberNav]=useState([])
  const [valorModulo,setValorModulo]=useState(1)
  const anchoSibar = pixelesSiber ? '10px' : '200px';

  // Estilos en línea para el contenedor principal
  const styles = {
    container: {
      position: 'absolute',
      top: '0px',
      right: '0px',
      margin: 'auto',
      padding: '0px 40px',
      width: `calc(100% - ${anchoSibar})`, // Ancho dinámico basado en el estado
      transition: 'margin-left 0.3s ease, width 0.3s ease',
      height: '100vh', // Altura completa de la ventana
    },
  };

  return (
    <HashRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <div style={{ display: 'flex' }}>
                <Sibar setPixelSiber={setPixelSiber} siberNav={siberNav} setValorModulo={setValorModulo}/>
                {/* <ModalInstanciaQR/> */}
                <div style={styles.container}>
                  <Routes>
                    <Route path="/modulo" element={<Modulo SetSiberNav={SetSiberNav} valorModulo={valorModulo}/>} />
                  </Routes>
                </div>
              </div>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;