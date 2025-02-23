import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import AppRouter from './router/index.jsx'
import { LoginProvider } from './context/loginProvider.jsx'
import { ReloadApiProvider } from './context/reloadApiProvider.jsx'

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <BrowserRouter>
      <StrictMode>
        <ReloadApiProvider>
          <AppRouter />
        </ReloadApiProvider>
      </StrictMode>
    </BrowserRouter>
  </LoginProvider>,
)
