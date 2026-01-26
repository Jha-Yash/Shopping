import React from 'react'
import "./Admin.css"
import Sidebar from "../../Components/Sidebar/Sidebar"
import { Routes,Route } from 'react-router-dom'
import ListProduct from "../../Components/ListProduct/ListProduct"
import AddProduct from "../../Components/AddProduct/AddProduct"
const Admin = () => {
  return (
    <div className='admin'>
<Sidebar></Sidebar>
<Routes>
   <Route path="/addproduct" element={<AddProduct></AddProduct>}></Route>{/*Routes = map URL → Component */}
  <Route path="/Listproduct" element={<ListProduct></ListProduct>}></Route>
</Routes>
    </div>
  )
}

export default Admin
//User clicks <Link to="/addproduct">
//        ↓
// URL changes to /addproduct
//         ↓
// React Router checks <Routes>
//         ↓
// <Route path="/addproduct" element={<AddProduct />} />
//         ↓
// AddProduct component renders
