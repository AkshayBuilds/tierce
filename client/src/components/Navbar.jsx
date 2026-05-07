import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import { toast } from "react-toastify";
const Navbar = () => {
  const [visible, setvisible] = useState(false);
  const { showSearch, setshowSearch, getCartCount, navigate,token ,settoken, setCartItems } = useContext(ShopContext);

  const logout = async() => {
    navigate("/login");
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    settoken("");
    setCartItems([]);
  }

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to="/" className="flex items-center gap-2">
        <span className="prata-regular text-2xl sm:text-3xl tracking-tight text-[#1a1a2e]">TIERCE</span>
      </Link>
      <ul className="hidden sm:flex gap-7 text-sm text-[#1a1a2e] uppercase tracking-wider">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-[#e8a87c] transition-colors">
          <p>Home</p>
          <hr className="w-full border-none h-[1.5px] bg-[#e8a87c] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-[#e8a87c] transition-colors">
          <p>Collection</p>
          <hr className="w-full border-none h-[1.5px] bg-[#e8a87c] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-[#e8a87c] transition-colors">
          <p>About</p>
          <hr className="w-full border-none h-[1.5px] bg-[#e8a87c] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-[#e8a87c] transition-colors">
          <p>Contact</p>
          <hr className="w-full border-none h-[1.5px] bg-[#e8a87c] hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6 ">
        <img
          onClick={() => {setshowSearch(!showSearch); navigate('/collection') }}
          src={assets.search_icon}
          className="w-5 cursor-pointer hover:opacity-60 transition-opacity"
          alt="Search"
        />
        <div className="group relative ">
            <img
            onClick={()=> token ? null : navigate('/login')}
              src={assets.profile_icon}
              className="w-5 cursor-pointer hover:opacity-60 transition-opacity"
              alt="Profile"
            />
            {/* Drop down */}
          {
            token && <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-white text-gray-500 rounded-lg shadow-lg border border-gray-100">
              <p className="cursor-pointer hover:text-[#e8a87c] transition-colors">My Profile</p>
              <p onClick={logout} className="cursor-pointer hover:text-[#e8a87c] transition-colors">Logout</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5 hover:opacity-60 transition-opacity" alt="Cart" />
          <p className="absolute -right-1.25 -bottom-1.25 w-4 text-center leading-4 bg-[#e8a87c] text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setvisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu"
        />
      </div>
      {/* //sidebarmenu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white z-50 transition-all shadow-2xl ${visible ? "w-full" : "w-0"}`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setvisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-b border-gray-100"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-b border-gray-100"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-b border-gray-100"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setvisible(false)}
            className="py-2 pl-6 border-b border-gray-100"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
