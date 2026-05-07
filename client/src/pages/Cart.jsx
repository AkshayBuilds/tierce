import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currancy, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setcartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setcartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="pt-10 pb-20 min-h-[70vh] bg-[#f8fafc]">

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0f172a]">My Bag
          <span className="ml-2 text-sm font-normal text-[#94a3b8]">({cartData.length} {cartData.length === 1 ? 'item' : 'items'})</span>
        </h1>
        <div className="w-10 h-0.5 bg-[#3b82f6] mt-2"></div>
      </div>

      {/* Empty State */}
      {cartData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 gap-5 bg-white rounded-2xl border border-[#e2e8f0]">
          <div className="w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center">
            <img src={assets.cart_icon} className="w-8 opacity-50" alt="" />
          </div>
          <div className="text-center">
            <p className="text-[#0f172a] font-semibold text-lg">Your bag is empty</p>
            <p className="text-[#94a3b8] text-sm mt-1">Looks like you haven't added anything yet</p>
          </div>
          <button
            onClick={() => navigate('/collection')}
            className="bg-[#3b82f6] text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-[#2563eb] transition-colors"
          >
            Start Shopping →
          </button>
        </div>
      )}

      {/* 2-Column Layout */}
      {cartData.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* LEFT — Items List */}
          <div className="flex-1 flex flex-col gap-0 bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">

            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_0.5fr] px-6 py-3 bg-[#f1f5f9] border-b border-[#e2e8f0]">
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Product</p>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Price</p>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Quantity</p>
              <p className="text-xs font-semibold text-[#64748b] uppercase tracking-wider">Total</p>
            </div>

            {/* Items */}
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);
              return (
                <div
                  key={index}
                  className={`grid grid-cols-[3fr_1fr_1fr_0.5fr] items-center gap-4 px-6 py-5 ${index !== cartData.length - 1 ? 'border-b border-[#f1f5f9]' : ''}`}
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f8fafc] shrink-0 border border-[#e2e8f0]">
                      <img
                        src={productData.image[0]}
                        className="w-full h-full object-cover"
                        alt={productData.name}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a] leading-snug">{productData.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#94a3b8]">Size:</span>
                        <span className="text-xs font-medium text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded-md">{item.size}</span>
                      </div>
                      {/* Mobile remove */}
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-xs text-[#ef4444] mt-1 hover:underline sm:hidden"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-sm font-semibold text-[#0f172a]">{currancy}{productData.price}</p>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#e2e8f0] rounded-lg w-fit overflow-hidden">
                    <button
                      onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                      className="w-7 h-8 flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
                    >−</button>
                    <input
                      onChange={(e) =>
                        e.target.value === '' || e.target.value === '0'
                          ? null
                          : updateQuantity(item._id, item.size, Number(e.target.value))
                      }
                      type="number"
                      className="w-9 h-8 text-center text-sm font-semibold text-[#0f172a] border-x border-[#e2e8f0] bg-white focus:outline-none"
                      min={1}
                      defaultValue={item.quantity}
                    />
                    <button
                      onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                      className="w-7 h-8 flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] transition-colors"
                    >+</button>
                  </div>

                  {/* Row Total + Desktop Remove */}
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-sm font-bold text-[#0f172a]">
                      {currancy}{(productData.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="hidden sm:flex w-6 h-6 items-center justify-center rounded-md hover:bg-[#fef2f2] transition-colors group"
                    >
                      <img src={assets.bin_icon} className="w-3.5 group-hover:opacity-70" alt="Remove" />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping */}
            <div className="px-6 py-4 border-t border-[#f1f5f9] bg-[#fafafa]">
              <button
                onClick={() => navigate('/collection')}
                className="text-sm text-[#3b82f6] font-medium hover:underline"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          <div className="w-full lg:w-80 shrink-0 bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden sticky top-24">
            <div className="px-5 py-4 border-b border-[#e2e8f0] bg-[#f8fafc]">
              <p className="text-sm font-bold text-[#0f172a] uppercase tracking-wider">Order Summary</p>
            </div>
            <div className="p-5">
              <CartTotal />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;