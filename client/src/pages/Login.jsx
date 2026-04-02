import React, { use, useContext, useEffect, useState } from "react";
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
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currantState}</p>
        <hr className="border-none h-[1.5px] w-8 text-gray-800" />
      </div>
      {currantState === "Log In" ? (
        ""
      ) : (
        <input
          onChange={(e) => setname(e.target.value)}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setemail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setpassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-2">
        <p className="cursor-pointer">Forgot your password</p>
        {currantState === "Log In" ? (
          <p
            className="cursor-pointer"
            onClick={() => setcurrantState("Sign Up")}
          >
            Create Account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setcurrantState("Log In")}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="text-white cursor-pointer bg-black font-light px-8 py-2 mt-4"
      >
        {currantState === "Log In" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
