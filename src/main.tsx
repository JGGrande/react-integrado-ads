import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Musica.css'
import { MusicaPage } from './Musica.tsx'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { MusicaFormPage } from './pages/MusicaFormPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='page-content'>
        <Routes>
          <Route path='/' element={<MusicaPage />} />
          <Route path='/app' element={<App />} />
          <Route path='/musicas/cadastro' element={<MusicaFormPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
