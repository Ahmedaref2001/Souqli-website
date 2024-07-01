import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dashboardSellerstyle from "../stylee/dashboardSellerstyle.module.css";
import logoImg from "../images/logo2.png";
import Help from "./Help";
import { Link } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { GrBladesHorizontal } from "react-icons/gr";
import { BiSolidPhone } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { IoPersonSharp } from "react-icons/io5";
import { IoHelpCircle } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export const DashboardSeller = ({ hindelResizeDashboard , currentPage,isEdit}) => {
  let dashboardElement = useRef();
  const [showMaxWidth, setShowMaxWidth] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
 

  function toggleWidth() {
    setShowMaxWidth((prev) => !prev);
    currentPage==="Overview"&&hindelResizeDashboard(!showMaxWidth);
    if (!showMaxWidth === false) {
      dashboardElement.current.classList.remove(dashboardSellerstyle.maxWidth);
      dashboardElement.current.classList.add(dashboardSellerstyle.minWidth);
    } else {
      dashboardElement.current.classList.add(dashboardSellerstyle.maxWidth);
      dashboardElement.current.classList.remove(dashboardSellerstyle.minWidth);
    }
  }
  const navigateToLogin=useNavigate()
function hindelLogOut(){
  navigateToLogin("/")
  localStorage.removeItem("userInfo")
  localStorage.removeItem("userToken")
  localStorage.removeItem("isvendor")
  
  
}
  return (
    <>
    {showHelp&&<Help setShowHelp={setShowHelp}/>}
    <aside
      className={
        showMaxWidth === true
          ? dashboardSellerstyle.maxWidth
          : dashboardSellerstyle.minWidth
      }
    >
      {showMaxWidth === true ? (
        <IoIosArrowBack
          className={dashboardSellerstyle.arrowIcon}
          onClick={toggleWidth}
        />
      ) : (
        <IoIosArrowForward
          className={dashboardSellerstyle.arrowIcon}
          onClick={toggleWidth}
        />
      )}
      
      <div
        className={`${dashboardSellerstyle.dashboard}  ${dashboardSellerstyle.maxWidth}`}
        ref={dashboardElement}
      >
        <div className={dashboardSellerstyle.logo}>
          <img src={logoImg} alt="logoImg" />
          {showMaxWidth && (
            <span>
              <h2>SOUQLY</h2>
              <p>your order is here</p>
            </span>
          )}
        </div>
        <div className={dashboardSellerstyle.pagesLinks}>
          <span>
            <p>Main</p>
          </span>
          <ul>
            <li>
              <Link to="/ProductDetailsPageForSeller" className={currentPage==="Overview"?(`${dashboardSellerstyle.link} ${dashboardSellerstyle.active}`):dashboardSellerstyle.link}>
                <BiSolidShow className={dashboardSellerstyle.linkIcon} />{" "}
                {showMaxWidth && <p>Overview</p>}
              </Link>{" "}
            </li>

            <li>
              <Link to="/AddProduct" className={currentPage==="Add Product"?(`${dashboardSellerstyle.link} ${dashboardSellerstyle.active}`):dashboardSellerstyle.link} >
                {
                  isEdit?<FaRegEdit className={dashboardSellerstyle.linkIcon}/>:
                  <IoMdAddCircle className={dashboardSellerstyle.linkIcon} />
                }
                
                {showMaxWidth && <p>{isEdit?"Eidt":"Add"} Product</p>}
              </Link>
            </li>

            <li>
              <Link to="/MyProductsPage" className={currentPage==="My Products"?(`${dashboardSellerstyle.link}  ${dashboardSellerstyle.active}`):dashboardSellerstyle.link} >
                <GrBladesHorizontal className={dashboardSellerstyle.linkIcon} />
                {showMaxWidth && <p>My Products</p>}
              </Link>
            </li>

            <li className={dashboardSellerstyle.contect}>
              <Link to="" className={dashboardSellerstyle.link} >
                <BiSolidPhone className={dashboardSellerstyle.linkIcon} />
                {showMaxWidth && <p>Contect Us</p>}<MdKeyboardArrowDown className={dashboardSellerstyle.arrowDown}/>
              </Link>
              <div className={dashboardSellerstyle.contectInfo}>
                <Link to="https://www.facebook.com/ahmed.mahamedaref?locale=ar_AR" target="_blank" className={dashboardSellerstyle.contectLink}><FaFacebook className={dashboardSellerstyle.contectIcon}/></Link>
                <Link to="https://www.linkedin.com/in/ahmed-aref-b39581249/" target="_blank" className={dashboardSellerstyle.contectLink}><FaLinkedin className={dashboardSellerstyle.contectIcon}/></Link>
                <Link to="mailto://aaref8626@gmail.com" target="_blank" className={dashboardSellerstyle.contectLink}><MdEmail className={dashboardSellerstyle.contectIcon}/></Link>
                <Link to="tel://01123099558" target="_blank" className={dashboardSellerstyle.contectLink}><IoCall className={dashboardSellerstyle.contectIcon}/></Link>
              </div>
            </li>
          </ul>
        </div>
        

        <div className={dashboardSellerstyle.pagesLinks}>
          <span className={dashboardSellerstyle.accountSetting}>
            {showMaxWidth && (
              <p className={dashboardSellerstyle.first}>Account</p>
            )}
            <p>Settings</p>
          </span>
          <ul>
            <li>
              <Link to="/SellerAccountPage" className={currentPage==="Account"?(`${dashboardSellerstyle.link} ${dashboardSellerstyle.active}`):dashboardSellerstyle.link} >
                <IoPersonSharp className={dashboardSellerstyle.linkIcon} />
                {showMaxWidth && <p>Account</p>}
              </Link>
            </li>
            <li>
              {" "}
              <Link to="" className={dashboardSellerstyle.link} onClick={()=>{setShowHelp(true)}}>
                <IoHelpCircle className={dashboardSellerstyle.linkIcon} />
                {showMaxWidth && <p>Help</p>}
              </Link>
            </li>
          </ul>
        </div>
        <div className={dashboardSellerstyle.logOut}>
          <p onClick={hindelLogOut}>
            <IoLogOutOutline className={dashboardSellerstyle.logOutIcon} />
            {showMaxWidth && <span>Log out</span>}
          </p>
        </div>
      </div>
    </aside>
    </>
  );
};
export default DashboardSeller;
