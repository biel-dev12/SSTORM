import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './globalStyle.js'
import AppRoutes from './Routes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <AppRoutes />
  </StrictMode>,
)
