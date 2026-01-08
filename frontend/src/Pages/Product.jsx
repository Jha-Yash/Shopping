import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import BreadCrums from "../Components/BreadCrums/BreadCrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'

const Product = () => {
  const { all_product } = useContext(ShopContext);//get data from global context //ShopContext → where all products are stored
  const { productId } = useParams();//get data from URL (/product/12 → 12)

  const product = all_product.find(
    (e) => e.id === Number(productId)//e.id mtlb poore array ki id traverse krega jo prdocut id sai match vo product mai save
  );

  return (
    <div>
      <BreadCrums product={product} /> {/*Breadcrumb → component that shows navigation path*/}
       <ProductDisplay product={product} />
       <DescriptionBox></DescriptionBox>
       <RelatedProducts></RelatedProducts>
    </div>
  );
};

export default Product;
