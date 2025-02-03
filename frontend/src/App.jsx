import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from './Pages/Contact.jsx';
import Home from './Pages/Home.jsx';
import Layout from './Layout.jsx';
import About from './Pages/About.jsx';
import SignUp from './Pages/SignUp.jsx';
import Cart from './Pages/Cart.jsx';
import LogIn from './Pages/LogIn.jsx';
import Order from './Pages/Order.jsx';

const App = () => {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "",
            element: <Home />
          },
          {
            path: "contact",
            element: <Contact />
          },
          {
            path: "about",
            element: <About />
          },
          {
            path: "signup",
            element: <SignUp />
          },
          {
            path: "cart",
            element: <Cart />
          },
          {
            path: "login",
            element: <LogIn />
          },
          {
            path: "checkout",
            element: <Order />
          }
          
        ]
      }
    ]
  );
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App