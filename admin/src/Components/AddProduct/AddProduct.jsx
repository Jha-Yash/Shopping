import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image,setImage]=useState(false);

  const imagehandler=(e)=>{
    setImage(e.target.files[0]);//ab jo image select krenngai vo add ho jayega image state mai
  }
  return (
    <div className="add-product">

      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input type="text" name="name" placeholder="Type here" />
      </div>

      <div className="addproduct-price">

        <div className="addproduct-itemfield">
          <p>Price</p>
          <input type="text" name="old_price" placeholder="Type here" />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input type="text" name="new_price" placeholder="Type here" />
        </div>

      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name="category" className="add-product-selector">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumbnail-img" /> {/*if image true it will show 
          seleted image else uploadarea image */}
        </label>
        <input onChange={imagehandler} type="file" name="image" id="file-input" hidden />
      </div>

      <button className="addproduct-btn">ADD</button>

    </div>
  )
}

export default AddProduct
