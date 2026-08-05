import React, { createContext ,useState , useEffect} from "react";// React → for JSX createContext → to create a global storage,useState → 
// to manage cart state

export const ShopContext = createContext(null);//Create a global box called ShopContext which can store data for the whole app”
// Right now it’s empty (null).

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+ 1; index++) {
    cart[index] = 0;//for every product card is empty initially
  }
  return cart;
};

const ShopContextProvider = (props) => {//This is a wrapper component Everything inside it will get access to global data

  const [cartItems, setCartItems] = useState(getDefaultCart());// Global cart state (cart is empty initially)
  const [all_product,setAll_Product]=useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => setAll_Product(data))
}, [])

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = all_product.find(
        (product) => product.id === Number(item)
      );
      totalAmount += itemInfo.new_price * cartItems[item];
    }
  }
  return totalAmount;
};

   const contextValue = {
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };//These are the things(data and fns) I want to share globally through context

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
//ShopContext.Provider → gives data 
// value={contextValue} → data being shared
// {props.children} → all components inside provider
// 🧠 Meaning:“Any component wrapped inside me can use all_product

export default ShopContextProvider;
