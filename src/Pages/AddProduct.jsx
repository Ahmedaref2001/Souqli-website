import React, { useEffect, useState } from "react";
import addProductstyle from "../stylee/addProductstyle.module.css";
import DashboardSeller from "../components/DashboardSeller";
import SellerNavbar from "../components/SellerNavbar";
import ProductInfo from "../components/ProductInfo";
import Footer from "../components/Footer"
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
export const AddProduct = () => {

let { id } = useParams();
const[isEdit,setIsEdit]=useState(false)

const[publishData,setPublishData]=useState(false)

const navigateToLogin=useNavigate()
useEffect(()=>{
  if(id){setIsEdit(true)}
  if(!localStorage.getItem("userInfo")){
    navigateToLogin("/Login")
  }
},[])

function hindelPublish(param){
  setPublishData(param)
}

  return (
    
      
      <div className={addProductstyle.page}>
        <DashboardSeller currentPage={"Add Product"} isEdit={isEdit}/>
        <div className={addProductstyle.mainSection}>
          <SellerNavbar currentPage={"Add Product"} hindelPublish={hindelPublish} isEdit={isEdit}/>
          <ProductInfo publishData={publishData} setPublishData={setPublishData}/>
          <Footer isSeller={true}/>
        </div>
      </div>
    
  );
};
