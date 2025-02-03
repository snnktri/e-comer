import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserAuthProvider } from './Context/AuthContext/userAuth'
import { ShopContextProvider } from './Context/ShopContext/ShopContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserAuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </UserAuthProvider>
  </StrictMode>,
)
