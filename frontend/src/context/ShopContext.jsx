import { createContext, use, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();



const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate= useNavigate()

  const [products,setProducts]=useState([])

  const [token,setToken]=useState("")

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
        toast.success("Added successfully")

      }catch(err){
        console.log(err)
        toast.error(err.message)
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if(token){
      try{
        await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
      }
      catch(err){
        console.log(err.message)
        toast.error(err.message)
      }
    }
  };

  const getCartAmount =  () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find(
        (product) => product._id === items
      );
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            if(itemInfo)
            totalAmount += cartItems[items][item] * itemInfo.price;
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  const getProductsData=async()=>{
    try{

      const response=await axios.get(backendUrl+'/api/product/list')
      if(response.data.success){
        setProducts(response.data.products)

      }
      else{
        toast.error(response.data.products)
      }


    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }

  const getUserCart = async (token) => {
  try {
    const response = await axios.post(
      backendUrl + "/api/cart/get",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (err) {
    console.log(err);
    toast.error("Unauthorized");
  }
};


  useEffect(()=>{
    getProductsData();
  },[])


  useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (!token && savedToken) {
    setToken(savedToken);
    getUserCart(savedToken);
  }
}, [token]);



  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,setCartItems,
    setCartItems,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,backendUrl,token,setToken
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
