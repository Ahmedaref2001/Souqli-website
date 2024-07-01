import React, { useEffect, useState } from "react";
import sellerNavbarstyle from "../stylee/sellerNavbarstyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import userImg from "../images/images.png";
export const SellerNavbar = ({currentPage,hindelPublish,hindelSaveUpdate,changeImg,setChangeImg,isEdit}) => {

  const [vendorImg,setVendorImg]=useState("")

  useEffect(()=>{
    setVendorImg(JSON.parse(localStorage.getItem("userInfo"))?JSON.parse(localStorage.getItem("userInfo")).imageUrl:"")
    if(currentPage==="Account"){
      setChangeImg(false)
    }
    

  },[changeImg])

  let Navigate=useNavigate()
  function hindelNavigate(){
    Navigate("/SellerAccountPage")
  }
  return (
    <div className={sellerNavbarstyle.navbar}>
      <h1>My Dashboard</h1>
      <span className={sellerNavbarstyle.actionAndImg}>
        {
          currentPage==="Overview"?<Link to="/AddProduct" className={sellerNavbarstyle.link}>Add <HiPlus/></Link>:currentPage==="Add Product"?
          <Link className={sellerNavbarstyle.link} onClick={()=>{hindelPublish(true)}}>{isEdit?"Edit":"Publish"} Now</Link>:currentPage==="Account"?
          <Link className={sellerNavbarstyle.link} onClick={()=>{hindelSaveUpdate(true)}}>Save</Link>:<span></span>
        }
        
        <img src={vendorImg?vendorImg:userImg} alt="userImg" onClick={hindelNavigate} />
      </span>
    </div>
  );
};
export default SellerNavbar;
