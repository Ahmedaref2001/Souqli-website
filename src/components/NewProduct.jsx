import React,{useState} from "react";
import newProductstyle from "../stylee/newProductstyle.module.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { useParams } from 'react-router';

export const NewProduct = ({ props }) => {
 

  
//hindel click on like
  let arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
  const[favoriteProducts,setFavoriteProducts]=useState(localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[])
    function hindelClickOnLikeIcon(e,id) {
       arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
      
      if(arreyOfFavoriteProducts.indexOf(`product_${id}`)===-1){
        arreyOfFavoriteProducts.push(`product_${id}`)
        e.target.classList.add(newProductstyle.active);
      }else{
        e.target.classList.remove(newProductstyle.active);
        arreyOfFavoriteProducts.forEach((ele,index)=>{
          if(ele===`product_${id}`){
            arreyOfFavoriteProducts.splice(index,1)
          }
        })
      }
      setFavoriteProducts(arreyOfFavoriteProducts)
      localStorage.setItem("favoriteProducts",JSON.stringify(arreyOfFavoriteProducts))
    }


    const navigate=useNavigate()
    let {category } = useParams();

    function hindelNavigate(proCategory,proId) {
      if(category==="All Categories"){
        navigate(`/DiscoverProducts/${proCategory}/${proId}`)
      }else{
      navigate(`${proId}`)
      }
      
    }
    
  return (
    <div className={newProductstyle.box}>

      <FaHeart  className={ favoriteProducts.indexOf(`product_${props.id}`)!==-1?`${newProductstyle.likeIcon} ${newProductstyle.active}`:newProductstyle.likeIcon}
          onClick={(e)=>hindelClickOnLikeIcon(e,props.id)}
          />

      <div className={newProductstyle.imgBox} onClick={()=>{hindelNavigate(props.category,props.id)}}>
        <img src={props.imageUrl[0]} alt="img" />
      </div>
      <p>{props.name}</p>
      <span className={newProductstyle.price}>
        <p><FaDollarSign/> {props.price} /1</p>
        <span>1</span>
      </span>
      <Link to={`/AddToCart/${props.id}`} className={newProductstyle.link}>Add to cart</Link>
    </div>
  );
};
export default NewProduct;
