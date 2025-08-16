import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GlobalTheme from './theme/GlobalTheme.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalTheme>
        <App />
      </GlobalTheme>
    </ThemeProvider>
  </StrictMode>,
)
