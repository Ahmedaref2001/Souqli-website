import React, { useEffect, useRef, useState } from "react";
import logo from "../images/logo1.png";
import navbarstyle from "../stylee/navbarstyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoMdCart } from "react-icons/io";

export const Navbar = ({ addToCartPage,handleNavigation,setCurrentSection,currentSection }) => {


  const [userAccount, setUserAccount] = useState(
    localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : ""
  );

  const ulElement = useRef(null);

  // Toggle list visibility
  const handleShowLinks = () => {
    ulElement.current.classList.toggle(navbarstyle.show);
  };

  

  // Navigate to BuyerPage
  let navigate = useNavigate();
  const navigateToBuyerPage = () => {
    navigate("/BuyerPage");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    localStorage.removeItem("isvendor");
    setUserAccount("");
  };


  // useEffect(()=>{
  //   setCurrentSection(addToCartPage ? "" : "Home")
  // },[])

  return (
    <nav className={addToCartPage ? navbarstyle.navbarInAddToCart : ""}>
      <div className={navbarstyle.logo}>
        <img src={logo} alt="logo" />
      </div>

      <div className={navbarstyle.allLinks}>
        <FiMenu className={navbarstyle.menuIcon} onClick={handleShowLinks} />

        <div className={navbarstyle.componentLinks}>
          <ul ref={ulElement}>
            <li>
              <a
                href="#"
                onClick={() =>{ !addToCartPage&&handleNavigation("#home");!addToCartPage&&setCurrentSection("Home")}}
                className={currentSection === "Home" ? navbarstyle.active : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => {!addToCartPage&&handleNavigation("#categoriesId");!addToCartPage&&setCurrentSection("Categories")}}
                className={currentSection === "Categories" ? navbarstyle.active : ""}
              >
                Categories
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => {!addToCartPage&&handleNavigation("#blogid");!addToCartPage&&setCurrentSection("Blog")}}
                className={currentSection === "Blog" ? navbarstyle.active : ""}
              >
                Blog
              </a>
            </li>
            <li>
              <a
                // href="#"
                onClick={() => {!addToCartPage&&handleNavigation("#contact");!addToCartPage&&setCurrentSection("Contact")}}
                className={currentSection === "Contact" ? navbarstyle.active : ""}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {userAccount ? (
          <div className={navbarstyle.userInfo}>
            <span>
              <IoMdCart
                className={navbarstyle.cartIcon}
                onClick={() => {
                  navigate("/AddToCart");
                }}
              />
            </span>
            <p className={navbarstyle.userEmail} title={userAccount.email} onClick={navigateToBuyerPage}>
              {userAccount.email}
            </p>
            <img src={userAccount.imageUrl} alt="userImg" className={navbarstyle.userImg} onClick={navigateToBuyerPage} />
            <Link to="/" className={navbarstyle.link} onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <div className={navbarstyle.registerLinks}>
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
