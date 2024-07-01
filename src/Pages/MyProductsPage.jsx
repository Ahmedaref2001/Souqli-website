import React,{ useEffect } from 'react'
import myProductsPagestyle from '../stylee/myProductsPagestyle.module.css'
import DashboardSeller from "../components/DashboardSeller";
import SellerNavbar from "../components/SellerNavbar";
import MyProductsDetails from '../components/MyProductsDetails';
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom";

export const MyProductsPage = () => {
    const navigateToLogin=useNavigate()
    useEffect(()=>{
      if(!localStorage.getItem("userInfo")){
        navigateToLogin("/Login")
      }
    })

  return (
    <div className={myProductsPagestyle.page}>
    <DashboardSeller currentPage={"My Products"} />
    <div className={myProductsPagestyle.mainSection}>
      <SellerNavbar currentPage={"My Products"}/>
      <MyProductsDetails/>
      
      <Footer/>
    </div>
  </div>
  )
}
export default MyProductsPage;