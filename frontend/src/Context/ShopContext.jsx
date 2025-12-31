import React, { createContext } from "react";// React → for JSX createContext → to create a global storage
import all_product from "../Components/Assets/all_product";

export const ShopContext = createContext(null);//Create a global box called ShopContext which can store data for the whole app”
// Right now it’s empty (null).

const ShopContextProvider = (props) => {//This is a wrapper component Everything inside it will get access to global data

  const contextValue = { all_product };//These are the things I want to share globally

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
