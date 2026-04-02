import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const navigate = useNavigate()

    const currancy = '$';
    const deliveryfee = 10;
    const backend_URL = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('')
    const [showSearch, setshowSearch] = useState(false)
    const [cartItems, setcartItems] = useState({})
    const [products, setproducts] = useState([])
    const [token, settoken] = useState('')

    const addtoCart = async(id, size) =>{
        if(!size){
            toast.error("Select Product Size")
            return
        }

        let cartData = structuredClone(cartItems)

        if(cartData[id]){
            if(cartData[id][size]){
                cartData[id][size] += 1
            }
            else{
                cartData[id][size] = 1
            }
        }
        else{
            cartData[id] = {}
            cartData[id][size] = 1
        }
        setcartItems(cartData)

        if(token){
            try {
                await axios.post(backend_URL + "/cart/add", {
                    itemId: id,
                    size,
                }, {
                    headers:{
                        token: token
                    }
                })
            } catch (error) {
                console.log(error.messgae)
                toast.error("Failed to add to cart")
            }
        }

    }

    const getCartCount = () =>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0 ){
                        totalCount += cartItems[items][item]

                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(id, size, quantity) =>{
        let cartdata = structuredClone(cartItems);
        cartdata[id][size] = quantity
        setcartItems(cartdata)

        if(token){
            try {
                await axios.post(backend_URL+'/cart/update',{itemId: id, size, quantity},{headers:{token}})
            } catch (error) {
             toast.error(error.messgae)   
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id == items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                }
            }
        }
        return totalAmount;
    }

    const getProductsData= async() => {
        try {
            const response = await axios.get(backend_URL + "/product/list")
            if(response.data.success){
                setproducts(response.data.products)
            }
            else{
                toast.error("Failed to fetch products:", response.data.message)
            }
        } catch (error) {
            console.error("Error fetching products:", error)
            toast.error("An error occurred while fetching products.")
        }
    }

    const getUserCart = async(token) =>{
        try {
            const response = await axios.post(backend_URL+'/cart/get',{},{headers:{token}})
            if(response.data.success){
                setcartItems(response.data.cartData)
            }
        } catch (error) {
            toast.error(error.messgae)
        }
    }

    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(() => {
        if(!token && localStorage.getItem("token")){
            settoken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem("token"))
        }
    },[])


    const value = {
        currancy, token, settoken,
        deliveryfee,
        products,
        search, setsearch,
        showSearch, setshowSearch,
        cartItems, addtoCart, getCartCount, updateQuantity, getCartAmount, navigate,
        backend_URL, setcartItems
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider