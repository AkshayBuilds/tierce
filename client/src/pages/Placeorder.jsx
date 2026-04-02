import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const {
    token,
    deliveryfee,
    products,
    cartItems,
    getCartAmount,
    navigate,
    backend_URL,
    setcartItems,
  } = useContext(ShopContext);
  const [method, setmethod] = useState("cod");
  const [formdata, setformdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformdata((data) => ({ ...data, [name]: value }));
  };


  const initpay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Description",
      order_id: order.id,

      handler: async (response) => {
        console.log("SUCCESS: hua ", response);
        try {
          const { data } = await axios.post(backend_URL+'/order/verify-razorpay',{razorpay_order_id: response.razorpay_order_id},{headers:{token}})
          if(data.success){
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }

        } catch (error) {
          toast.error("An error occurred during payment verification.");
          console.log(error.message)
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id == items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      switch (method) {
        // Api for cod
        case "cod":
          const response = await axios.post(
            backend_URL + "/order/place",
            {
              items: orderItems,
              amount: getCartAmount() + deliveryfee,
              address: formdata,
            },
            { headers: { token } },
          );
          if (response.data.success) {
            setcartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        // Api for Stripe
        case "stripe":
          const responseStripe = await axios.post(
            backend_URL + "/order/stripe",
            {
              items: orderItems,
              amount: getCartAmount() + deliveryfee,
              address: formdata,
            },
            { headers: { token } },
          );

          if (responseStripe.data.success) {
            const session_url = responseStripe.data.url;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;
        // Api for Razorpay
        case "razorpay":
          const responseRazorpay = await axios.post(
            backend_URL + "/order/razorpay",
            {
              items: orderItems,
              amount: getCartAmount() + deliveryfee,
              address: formdata,
            },
            { headers: { token } },
          );
          console.log(responseRazorpay);
          if (responseRazorpay.data.success) {
            initpay(responseRazorpay.data.order);
          }
          break;
        default:
          break;
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={submitForm}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl my-3 sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firstName"
            value={formdata.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            onChange={onChangeHandler}
            name="lastName"
            value={formdata.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          required
          onChange={onChangeHandler}
          name="address"
          value={formdata.address}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street Address"
        />
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="zipCode"
            value={formdata.zipCode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formdata.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>

      {/* right side */}
      <div className="mt- 8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col sm:flex-row">
            <div
              onClick={() => setmethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}
              >
                {" "}
              </p>
              <img src={assets.stripe_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setmethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}
              >
                {" "}
              </p>
              <img src={assets.razorpay_logo} className="h-5 mx-4" alt="" />
            </div>
            <div
              onClick={() => setmethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer  "
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}
              >
                {" "}
              </p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="text-white cursor-pointer bg-black px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
