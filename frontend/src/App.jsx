import React from 'react';
import { createBrowserRouter, RouterProvider, UNSAFE_decodeViaTurboStream } from "react-router-dom";
import Contact from './Pages/Contact.jsx';
import Home from './Pages/Home.jsx';
import Layout from './Layout.jsx';
import About from './Pages/About.jsx';
import SignUp from './Pages/SignUp.jsx';
import Cart from './Pages/Cart.jsx';
import LogIn from './Pages/LogIn.jsx';
import Order from './Pages/Order.jsx';
import AdminDasBoard from './Pages/AdminDasBoard.jsx';
import SuccessPage from './Pages/SuccessPage.jsx';
import AdminPannel from './Pages/AdminPannel.jsx';
import SearchItem from './Pages/SearchItem.jsx';
import AddProduct from './Pages/AddProduct.jsx';

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
          },
          
          {
            path: "success",
            element: <SuccessPage />
          },
          {
            path: "admin",
            element: <AdminPannel />,
            children:[
              {
                index: true,
                element: <AdminDasBoard />
              },
              {
                path: "productManage",
                element: <AdminDasBoard />
              },
              {
                path: "search",
                element: <SearchItem />
              },
              {
                path: "addnew",
                element: <AddProduct />
              }
            ]
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