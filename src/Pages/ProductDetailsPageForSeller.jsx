import React, { useEffect, useState } from "react";
import productDetailsPageForSellerstyle from "../stylee/productDetailsPageForSellerstyle.module.css";
import DashboardSeller from "../components/DashboardSeller";
import ProductDetailsPage from "./ProductDetailsPage";
import SellerNavbar from "../components/SellerNavbar"
import { useNavigate } from "react-router-dom";
export const ProductDetailsPageForSeller = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [isMaxWidth, setIsMaxWidth] = useState(true);
  
  const navigateToLogin=useNavigate()
  useEffect(() => {
    setIsSeller(true);
    if(!localStorage.getItem("userInfo")){
      navigateToLogin("/Login")
    }
  }, []);

  

  function hindelResizeDashboard(showMaxWidth) {
    setIsMaxWidth(showMaxWidth)
  }

  return (
      <div className={productDetailsPageForSellerstyle.page}>
        <DashboardSeller hindelResizeDashboard={hindelResizeDashboard} currentPage={"Overview"} />
        <div className={productDetailsPageForSellerstyle.manSection}>
          <SellerNavbar currentPage={"Overview"}/>
          <ProductDetailsPage isMaxWidth={isMaxWidth}/>
        </div>
      </div>
  );
};
export default ProductDetailsPageForSeller;
