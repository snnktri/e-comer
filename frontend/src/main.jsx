import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserAuthProvider } from './Context/AuthContext/userAuth'
import { ShopContextProvider } from './Context/ShopContext/ShopContext'
import { AdminAuthProvider } from './Context/AuthContext/adminAuth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
    <UserAuthProvider>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </UserAuthProvider>
    </AdminAuthProvider>
  </StrictMode>,
)
