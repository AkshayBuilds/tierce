import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShpoContextProvider from './context/Shopcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShpoContextProvider>
      <App />
    </ShpoContextProvider>
  </BrowserRouter>
)

