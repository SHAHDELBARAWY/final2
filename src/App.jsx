import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import Layout from './Components/Layout/Layout'
import Notfound from './Components/Notfound/Notfound'
import Navbar from './Components/Navbar/Navbar'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Wishlist from './Components/Wishlist'
import Brands from './Components/Brands'
import Categories from './Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider, { UserContext } from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetailes from './Components/ProductDetailes/ProductDetailes'
import CartContextProvider from './Context/CartContext'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import WhishlistContextProvider from './Context/WhishlistContext'

let query = new QueryClient({
  //defaultOptions:{

  //}
});

let router = createHashRouter([
  {
      path: '/',
      element: <Layout />,
      children: [
          { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
          { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
          { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
          { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
          { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
          { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
          { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetailes /></ProtectedRoute> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: '*', element: <Notfound /> } 
      ],
  },
]);

function App() {

  return (
    <>
    <QueryClientProvider client={query}>
    <CartContextProvider>
      <WhishlistContextProvider>
      <UserContextProvider>
      <CounterContextProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster/>
      <ReactQueryDevtools/>
      </CounterContextProvider>
    </UserContextProvider>
      </WhishlistContextProvider>
   </CartContextProvider>
    </QueryClientProvider>
    </>
    
  )
}

export default App