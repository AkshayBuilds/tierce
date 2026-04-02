import React, { useContext, useEffect } from 'react'
import './index.css'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Placeorder from './pages/Placeorder'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Verify from './pages/Verify'
import { ShopContext } from './context/Shopcontext'

const App = () => {

  const { settoken } = useContext(ShopContext)

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    settoken(token); 
  }
}, []);
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/placeorder' element={<Placeorder/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark" toastClassName="rounded-lg shadow-lg"/>
    </div>
  )
}

export default App
