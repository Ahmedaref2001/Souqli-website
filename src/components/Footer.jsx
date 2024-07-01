import React,{useState} from "react";
import footerstyle from "../stylee/footerstyle.module.css";
import logo from "../images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { IoMail } from "react-icons/io5";
export const Footer = ({contactElement}) => {
  const [isSeller,setIsSeller]=useState(JSON.parse(localStorage.getItem("isvendor")))

  const navigate=useNavigate()
    
  return (
    <footer ref={contactElement}>
      <Container className={footerstyle.container}>
        <div className={footerstyle.logoAndSocail}>
          <img src={logo} alt="logo"  onClick={()=>{isSeller?navigate("/MyProductsPage"):navigate("/")}}/>
          <div className={footerstyle.socailAccounts}>
            <Link className={footerstyle.link}>
              <IoLogoInstagram />
            </Link>
            <Link className={footerstyle.link}>
              <FaFacebookSquare />
            </Link>
            <Link className={footerstyle.link}>
              <FaTwitter />
            </Link>
          </div>
        </div>
        {isSeller === true ? (
          <h2>As Seller</h2>
        ) : (
          <div className={footerstyle.infoAndContact}>
            <div className={footerstyle.info}>
              <p>Souqly.com</p>
              <h5>Souqly.com</h5>
            </div>
            <div className={footerstyle.contact}>
              <Link to="tel://01123099558" className={footerstyle.link}>
                <IoMdCall /> (+20) 0112 309 9558
              </Link>
              <Link
                to="mailto:aaref8626@gmail.com"
                className={footerstyle.link}
              >
                <IoMail /> aaref8626@gmail.com
              </Link>
            </div>
          </div>
        )}
      </Container>
    </footer>
  );
};
export default Footer;
