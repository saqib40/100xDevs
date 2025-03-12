import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HashRouter, Routes, Route } from "react-router-dom"
import LandingPage from './pages/LandingPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/preview" element={<App/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
)
