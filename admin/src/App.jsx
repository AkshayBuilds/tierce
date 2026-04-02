import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/Add";
import ProductList from "./pages/List";
import Orders from "./pages/Orders";
import { useState } from "react";
import Login from "./components/Login";
import { ToastContainer} from 'react-toastify';

 
export const backend_URL = import.meta.env.VITE_BACKEND_URL
export const currancy = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <div className="flex w-full">
            <SideBar />
            <div className="w-[70%] mx-auto  ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<AddProduct token={token}/>} />
                <Route path="/list" element={<ProductList token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </div>

  );
};

export default App;
