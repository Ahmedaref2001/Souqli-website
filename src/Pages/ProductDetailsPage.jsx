import React, { useRef } from "react";
import productDetailsPagestyle from "../stylee/productDetailsPagestyle.module.css";
import Footer from "../components/Footer";
import ProductDetails from "../components/ProductDetails"
import { IoMdCart } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
//{isSeller,isMaxWidth} from seller page
export const ProductDetailsPage = ({isMaxWidth}) => {
    const ulElement = useRef("");
    //hindel toggle list
  function hindelShowLinks() {
    ulElement.current.classList.toggle(productDetailsPagestyle.show);
  }
  return (
    <section className={productDetailsPagestyle.productDetails}>
        <Container>
          <header>
        <h3>Product Details</h3>
      </header>
      <div className={productDetailsPagestyle.productsNavigation}>
        {/* Add a class menuIconInMinWidth to control in the menuIcon view while maximization and minimization of the dashboardForSeller */}
        <FiMenu className={isMaxWidth===true?`${productDetailsPagestyle.menuIconInMinWidth} ${productDetailsPagestyle.menuIcon}`:`${productDetailsPagestyle.menuIcon}`} onClick={hindelShowLinks} />
        {/* Add a class minWidth to control in the menuIcon view while maximization and minimization of the dashboardForSeller */}
        <ul ref={ulElement} className={isMaxWidth===true?productDetailsPagestyle.minWidth:""}>
            <li>
                <Link to="" className={productDetailsPagestyle.link}>Women's Clothing</Link>
            </li> 
            <li>
                <Link to="" className={productDetailsPagestyle.link}>Men's Clothing</Link>
            </li>
             <li>
                <Link to="" className={productDetailsPagestyle.link}>Kids Clothing</Link>
            </li> 
            <li>
                <Link to="" className={productDetailsPagestyle.link}>Beauty</Link>
            </li>
             <li>
                <Link to="" className={productDetailsPagestyle.link}>Hobby Items</Link>
            </li>
            <li>
                <Link to="" className={productDetailsPagestyle.link}>Home Decor</Link>
            </li>
        </ul>
        <span>
            <Link to="" className={productDetailsPagestyle.link}>Sell items</Link>
            <IoMdCart className={productDetailsPagestyle.cartIcon}/>
        </span>
      </div>
   
    </Container>
    <ProductDetails/>
    <Footer/>
    </section>
  );
};
export default ProductDetailsPage;
