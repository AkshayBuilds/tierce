import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [currantState, setcurrantState] = useState("Log In");
  const { token, settoken, navigate, backend_URL } = useContext(ShopContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      if (currantState === "Sign Up") {
        const response = await axios.post(backend_URL + "/user/register", {
          name,
          email,
          password,
        });
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backend_URL + "/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          settoken(response.data.token);
          localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  },[token]);

  return (
    <form
      onSubmit={submitFormHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-[#1a1a2e]"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currantState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-[#e8a87c]" />
      </div>
      {currantState === "Log In" ? (
        ""
      ) : (
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          className="w-full px-4 py-3 border border-[#e5e1db] rounded-lg bg-white text-sm focus:border-[#e8a87c]"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setemail(e.target.value)}
        type="email"
        className="w-full px-4 py-3 border border-[#e5e1db] rounded-lg bg-white text-sm focus:border-[#e8a87c]"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        className="w-full px-4 py-3 border border-[#e5e1db] rounded-lg bg-white text-sm focus:border-[#e8a87c]"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer text-gray-400 hover:text-[#e8a87c] transition-colors">Forgot your password?</p>
        {currantState === "Log In" ? (
          <p
            className="cursor-pointer text-[#e8a87c] hover:text-[#d4956a] font-medium transition-colors"
            onClick={() => setcurrantState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer text-[#e8a87c] hover:text-[#d4956a] font-medium transition-colors"
            onClick={() => setcurrantState("Log In")}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="text-white cursor-pointer bg-[#1a1a2e] hover:bg-[#e8a87c] font-medium px-10 py-3 mt-4 rounded-lg transition-colors tracking-wider text-sm"
      >
        {currantState === "Log In" ? "SIGN IN" : "SIGN UP"}
      </button>
    </form>
  );
};

export default Login;
