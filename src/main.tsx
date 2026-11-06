import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Musica.css'
import { MusicaPage } from './Musica.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { MusicaFormPage } from './pages/MusicaFormPage.tsx'
import { MusicaListPage } from './pages/MusicaListPage.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='page-content'>
        <Routes>
          {/* Nossa página de musicas */}
          <Route path='/' element={<MusicaListPage />} />
          {/* Itunes */}
          <Route path='/itunes' element={<MusicaPage />} /> 
          <Route path='/musicas/cadastro' element={<MusicaFormPage />} />
          <Route path='/musicas/:id/editar' element={<MusicaFormPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>

    <ToastContainer />
  </StrictMode>,
)
