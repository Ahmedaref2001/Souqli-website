import React from "react";
import logo from "../images/logo2.png";
import searchForProductsstyle from "../stylee/searchForProductsstyle.module.css";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";
import { IoSearch } from "react-icons/io5";

export const SearchForProducts = ({searchValue,hindelSerch,hindelClickEnter}) => {
 
  const [userAccount, setUserAccount] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : ""
  );

   //hindel Navigate To Buyer Page
   let navigate=useNavigate()
   function navigateToBuyerPage(){
    navigate("/BuyerPage")
   }

  return (
    <nav className={searchForProductsstyle.nav}>
      <div className={searchForProductsstyle.logoAndTitle}>
        <img src={logo} alt="logo" />
        <p>Discover new products</p>
      </div>

      <div className={searchForProductsstyle.userInfoAndSearch}>
        <div className={searchForProductsstyle.searchFilld}>
            <IoSearch className={searchForProductsstyle.searchIcon} />
            <input type="search" placeholder="Search for products in souqly" value={searchValue} onChange={(e)=>{hindelSerch(e)}} onKeyDown={(e)=>{hindelClickEnter(e)}}/>
        </div>
        {userAccount ? (
          <div className={searchForProductsstyle.userInfo}>
                <span><IoMdCart className={searchForProductsstyle.cartIcon} onClick={()=>{navigate("/AddToCart")}}/></span>
                <p
                className={searchForProductsstyle.userEmail}
                title={userAccount.email}
                onClick={navigateToBuyerPage}
                >
                {userAccount.email}
                </p>
                <img
                src={userAccount.imageUrl}
                alt="userImg"
                className={searchForProductsstyle.userImg}
                onClick={navigateToBuyerPage}
                />
          </div>
        ) : (
          <div className={searchForProductsstyle.regesterLinks}>
            <Link to="/Signup" className={searchForProductsstyle.link}>
              Sign Up
            </Link>
            <Link to="/Login" className={searchForProductsstyle.link}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default SearchForProducts;
