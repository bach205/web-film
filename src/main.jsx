import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import AppRouter from './router/index.jsx'
import { LoginProvider } from './context/loginProvider.jsx'

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <BrowserRouter basename='/web-film'>
      <StrictMode>
        <AppRouter />
      </StrictMode>
    </BrowserRouter>
  </LoginProvider>,
)
