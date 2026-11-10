import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import CreatePage from './pages/CreatePage'
import EditPage from './pages/EditPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/videojuegos" replace />} />
          <Route path="/videojuegos" element={<ListPage />} />
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
