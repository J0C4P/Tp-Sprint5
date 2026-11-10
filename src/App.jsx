import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/videojuegos" replace />} />
          <Route path="/videojuegos" element={<ListPage />} />
          <Route path="/videojuegos/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
