import React,{useEffect, useState} from "react";
import sellerAccountPagestyle from "../stylee/sellerAccountPagestyle.module.css";
import DashboardSeller from "../components/DashboardSeller";
import SellerNavbar from "../components/SellerNavbar";
import SellerAccountInfo from "../components/SellerAccountInfo";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
export const SellerAccountPage = () => {
  const[saveUpdate,setSaveUpdate]=useState(false)
  const[changeImg,setChangeImg]=useState(false)
  function hindelSaveUpdate(param){
    setSaveUpdate(param)
  }

  const navigateToLogin=useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("userInfo")){
      navigateToLogin("/Login")
    }
  })
   
  return (
    <div className={sellerAccountPagestyle.page}>
      <DashboardSeller currentPage={"Account"} />
      <div className={sellerAccountPagestyle.mainSection}>
        <SellerNavbar currentPage={"Account"} hindelSaveUpdate={hindelSaveUpdate} changeImg={changeImg} setChangeImg={setChangeImg}/>
        <SellerAccountInfo saveUpdate={saveUpdate} setSaveUpdate={setSaveUpdate} setChangeImg={setChangeImg}/>
        <Footer/>
      </div>
    </div>
  );
};
export default SellerAccountPage;


