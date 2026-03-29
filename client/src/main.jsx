import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MainAppFunc from './MainAppFunc'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <MainAppFunc/>    
  </BrowserRouter>
)
