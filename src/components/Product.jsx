import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import productstyle from "../stylee/productstyle.module.css";
import { Link } from "react-router-dom";

export const Product = ({ details }) => {
  
  let arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
const[favoriteProducts,setFavoriteProducts]=useState(localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[])
  function hindelClickOnLikeIcon(e,id) {
     arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
    
    if(arreyOfFavoriteProducts.indexOf(`product_${id}`)===-1){
      arreyOfFavoriteProducts.push(`product_${id}`)
      e.target.classList.add(productstyle.active);
    }else{
      e.target.classList.remove(productstyle.active);
      arreyOfFavoriteProducts.forEach((ele,index)=>{
        if(ele===`product_${id}`){
          arreyOfFavoriteProducts.splice(index,1)
        }
      })
    }
    setFavoriteProducts(arreyOfFavoriteProducts)
    localStorage.setItem("favoriteProducts",JSON.stringify(arreyOfFavoriteProducts))
  }



  return (
    <div className={productstyle.box}>
      <img src={details.imageUrl[0]} alt="img" />
      <div className={productstyle.titleAndIcon}>
        <p>{details.name}</p>
        <FaHeart
          className={ favoriteProducts.indexOf(`product_${details.id}`)!==-1?`${productstyle.likeIcon} ${productstyle.active}`:productstyle.likeIcon}
          onClick={(e)=>hindelClickOnLikeIcon(e,details.id)}
        />
      </div>
      
      <div className={productstyle.price}>
        <span>
          <FaDollarSign />
          {(details.price).toFixed(2)}
        </span>
        <span>
          <FaDollarSign />
          {(details.price + details.price * (5/100)).toFixed(2)}
        </span>
      </div>
      <Link to={`/AddToCart/${details.id}`} className={productstyle.link}>Add to cart</Link>
    </div>
  );
};
export default Product;
