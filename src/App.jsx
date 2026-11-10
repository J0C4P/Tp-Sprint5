import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import NotFoundPage from './pages/NotFoundPage'
import { ORDEN_INICIAL, DIRECCION_INICIAL } from './config/opciones'

function App() {
  const [busqueda, setBusqueda] = useState('')
  const [orden, setOrden] = useState(ORDEN_INICIAL)
  const [direccion, setDireccion] = useState(DIRECCION_INICIAL)

  return (
    <>
      <Navbar
        busqueda={busqueda}
        setBusqueda={setBusqueda}
        orden={orden}
        setOrden={setOrden}
        direccion={direccion}
        setDireccion={setDireccion}
      />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/videojuegos" replace />} />
          <Route path="/videojuegos" element={<ListPage busqueda={busqueda} orden={orden} direccion={direccion} />} />
          <Route path="/videojuegos/crear" element={<CreatePage />} />
          <Route path="/videojuegos/:id" element={<DetailPage />} />
          <Route path="/videojuegos/:id/editar" element={<EditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
