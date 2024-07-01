import React, { useRef } from "react";
import logo from "../images/logo1.png";
import navbarstyle from "../stylee/navbarstyle.module.css";
import { Link ,useNavigate} from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { IoMdCart } from "react-icons/io";

export const Navbar = ({addToCartPage}) => {

  const [userAccount, setUserAccount] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : ""
  );

  const[currentSection,setCurrentSection]=useState(addToCartPage?"":"Home")


  const ulElement = useRef("");
  //hindel toggle list
  function hindelShowLinks() {
    ulElement.current.classList.toggle(navbarstyle.show);
  }

  //hindel Navigate To Buyer Page
  let navigate=useNavigate()
  function navigateToBuyerPage(){
   navigate("/BuyerPage")
  }

  //hindel logOut 
  function hindelLogOut(){
    localStorage.removeItem("userInfo")
    localStorage.removeItem("userToken")
    localStorage.removeItem("isvendor")
    setUserAccount("")
  }
  
  return (
    <nav className={addToCartPage?navbarstyle.navbarInAddToCart:""}>
      <div className={navbarstyle.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={navbarstyle.allLinks}>
        <FiMenu className={navbarstyle.menuIcon} onClick={hindelShowLinks} />
        <div className={navbarstyle.componentLinks}>
          <ul ref={ulElement}>
            <li><a href={addToCartPage?"/#home":"#home"} className={currentSection==="Home"?navbarstyle.active:""} onClick={()=>setCurrentSection("Home")} >Home</a></li>
            <li><a href={addToCartPage?"/":"#categoriesId"}  className={currentSection==="Categories"?navbarstyle.active:""} onClick={()=>setCurrentSection("Categories")}>Categories</a></li>
            <li><a href={addToCartPage?"/":"#blogid"}  className={currentSection==="Blog"?navbarstyle.active:""} onClick={()=>setCurrentSection("Blog")}>Blog</a></li>
            <li><a href={addToCartPage?"/":"#contact"}  className={currentSection==="Contact"?navbarstyle.active:""} onClick={()=>setCurrentSection("Contact")}>Contact</a></li>
          </ul>
        </div>

        {userAccount ? (
          <div className={navbarstyle.userInfo}>
           <span><IoMdCart className={navbarstyle.cartIcon} onClick={()=>{navigate("/AddToCart")}}/></span>
            <p className={navbarstyle.userEmail} title={userAccount.email} onClick={navigateToBuyerPage}>{userAccount.email}</p>
            <img src={userAccount.imageUrl} alt="userImg" className={navbarstyle.userImg} onClick={navigateToBuyerPage}/>
            <Link to="/" className={navbarstyle.link} onClick={()=>{hindelLogOut()}}>Logout</Link>
          </div>
        ) : (
          <div className={navbarstyle.regesterLinks}>
            <Link to="/Signup" className={navbarstyle.link}>
              Sign Up
            </Link>
            <Link to="/Login" className={navbarstyle.link}>
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
