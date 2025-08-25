import './i18n'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'

const root = createRoot(document.getElementById('root')!)
root.render(<React.StrictMode>
  <React.Suspense fallback={<>…</>}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.Suspense>
  </React.StrictMode>)
