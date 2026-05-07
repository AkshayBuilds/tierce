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
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
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
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[#fafaf8] min-h-screen'>
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
      </Routes>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light" toastClassName="rounded-lg shadow-lg"/>
    </div>
  )
}

export default App
