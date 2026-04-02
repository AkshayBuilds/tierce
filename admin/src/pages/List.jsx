import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_URL, currancy } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setlist] = useState([]);

  const feacthData = async () => {
    try {
      const response = await axios.get(`${backend_URL}/product/list`, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        setlist(response.data.products);
      } else {
        toast.error("Failed to fetch product list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
      toast.error("An error occurred while fetching the product list.");
    }
  };

  const removeproduct = async (id) => {
    try {
      const response = await axios.post(backend_URL + "/product/remove", { id }, {
        headers: {
          token: token,
        },
      });
      if (response.data.success) {
        toast.success("Product removed successfully");
        await feacthData();
      } else {
        toast.error("Failed to remove product:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("An error occurred while removing the product.");
    }
  }

  useEffect(() => {
    feacthData();
  }, []);

  return (
    <>
      <p className="mb-2">All products</p>
      <div className="flex flex-col gap-2">
        {/* list table */}

        <div className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b className="hidden md:block" >Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {/* Product List */}

        {list.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-200"
            key={index}>
            <img className="w-12" src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p className="hidden md:block">{item.category}</p>
            <p>
              {currancy}
              {item.price}
            </p>
            <p onClick={()=>removeproduct(item._id)} className="cursor-pointer text-lg">
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
