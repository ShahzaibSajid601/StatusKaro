import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource/playfair-display/700.css'
import '@fontsource/playfair-display/700-italic.css'
import '@fontsource/anton'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/cormorant-garamond/600-italic.css'
import '@fontsource/cormorant-garamond/700.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/800.css'
import './index.css'
import { AuthProvider, Protected } from './auth'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Studio from './pages/Studio'
import Admin from './pages/Admin'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Protected><Studio /></Protected>} />
        <Route path="/admin" element={<Protected admin><Admin /></Protected>} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
)
