import React, { useState,useEffect } from "react";
import productDetailsstyle from "../stylee/productDetailsstyle.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoIosMore } from "react-icons/io";
import { FaStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa";
import { TbExclamationMark } from "react-icons/tb";
import { FaShare } from "react-icons/fa";
import { Link ,useNavigate} from "react-router-dom";
import { useParams } from 'react-router';
import axios from "axios";
import Loader from '../components/Loader'
import Feedback from "./Feedback";
export const ProductDetails = () => {
//state to loadind
  const[loadind,setLoadind]=useState(false)

const navigate=useNavigate()


const[allProduct,setAllProduct]=useState([])
const[productDetials,setProductDetials]=useState("")
const [productImg, setProductImg] = useState("");

const[vendorData,setVendorData]=useState({})
const [isSeller,setIsSeller]=useState(JSON.parse(localStorage.getItem("isvendor")))


let { id,category } = useParams();

if(isSeller&&!id){
  id=JSON.parse(localStorage.getItem("firestProduct"))
}


  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("isvendor"))){
      setIsSeller(JSON.parse(localStorage.getItem("isvendor")))
      setVendorData( JSON.parse(localStorage.getItem("userInfo")))
    }else{
      setIsSeller(false)
    }
    
    

    if(isSeller&&!id){
      id=JSON.parse(localStorage.getItem("firestProduct"))
    }




  if(id||category){
    setLoadind(true)
    
      
      if(isSeller){
        axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/productdetails/${id}`).then((response)=>{
          setProductDetials(response.data)
          setProductImg(response.data.imageUrl[0])
          setLoadind(false)
        }).catch((error)=>{
          console.log(error)
          setLoadind(false)
        }) 

      }else{
        axios.get(`https://souqlysystemsite.runasp.net/api/Home/productdetails?categoryName=${category}`).then((response)=>{
          setAllProduct(response.data)
          let specificProduct=(response.data).filter((ele)=>{
            return ele.id=== +id
          })
          setProductDetials(specificProduct[0])
        //  console.log(specificProduct)
          setProductImg(specificProduct[0].imageUrl[0])
          setLoadind(false)
        }).catch((error)=>{
          console.log(error)
          setLoadind(false)
      }) 
      }
  }

},[id])
 



//hindel click on like
let arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
const[favoriteProducts,setFavoriteProducts]=useState(localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[])
  function hindelClickOnLikeIcon(e,id) {
     arreyOfFavoriteProducts=localStorage.getItem("favoriteProducts")?JSON.parse(localStorage.getItem("favoriteProducts")):[]
    
    if(arreyOfFavoriteProducts.indexOf(`product_${id}`)===-1){
      arreyOfFavoriteProducts.push(`product_${id}`)
      e.target.classList.add(productDetailsstyle.active);
    }else{
      e.target.classList.remove(productDetailsstyle.active);
      arreyOfFavoriteProducts.forEach((ele,index)=>{
        if(ele===`product_${id}`){
          arreyOfFavoriteProducts.splice(index,1)
        }
      })
    }
    setFavoriteProducts(arreyOfFavoriteProducts)
    localStorage.setItem("favoriteProducts",JSON.stringify(arreyOfFavoriteProducts))
  }


  
  
  const ratArray = [1, 2, 3, 4, 5];
 

  return (
    <>
    {loadind&&<Loader/>}

    <article>
      <Container className={productDetailsstyle.container}>
        <p
          onClick={() => {
            window.history.back();
          }}
          className={productDetailsstyle.goBack}
        >
          <IoIosArrowBack className={productDetailsstyle.arrowBack} /> Go Back
        </p>
        {
          productDetials&&
        <Row>

           {/* hindle this div size in productDetails in seller page */}
          <Col lg={2} md={isSeller?3:2} sm={4} className="p-3">
            <div className={productDetailsstyle.imgesOfProduct}>
              {productDetials.imageUrl.map((ele, index) => (
                <img src={ele} alt="img" key={index} onClick={()=>{setProductImg(ele)}}/>
              ))}
            </div>
          </Col>

           {/* hindle this div size in productDetails in seller page */}
          <Col lg={isSeller?5:4} md={isSeller?8:5} sm={8} className="p-3">
            <div className={productDetailsstyle.viewImg}>
              <img src={productImg} alt="img" className="w-100 rounded-3" />
            </div>
          </Col>

            {/* hindle this div size in productDetails in seller page */}
          <Col lg={isSeller?5:4} md={isSeller?11:5} sm={isSeller?12:8} className="p-3">
            <div className={productDetailsstyle.productNameAndPrice}>
              <h3>{productDetials.name}</h3>
              <span>
                <FaDollarSign className={productDetailsstyle.DollarSign} />
                {productDetials.price}
              </span>
            </div>

            <div className={productDetailsstyle.sellerInfo}>
              <img src={isSeller?vendorData.imageUrl:productDetials.vendorImage} alt="img" />
              <span>
                <p>Seller: {isSeller?vendorData.name:productDetials.vendorName}</p>
                <p>Location: {isSeller?vendorData.location:productDetials.vendorLocation}</p>
                <span>
                  {ratArray.map((ele, index) => {
                    if (ele <= 4) {
                      return (
                        <FaStar
                          className={productDetailsstyle.active}
                          key={index}
                        />
                      );
                    } else {
                      return <FaStar key={index} />;
                    }
                  })}
                </span>
              </span>
            </div>

            <div className={productDetailsstyle.proudectDetailsInfo}>
              {
                  Object.keys(productDetials).map((key,index)=>(
                  key!=="name"&&key!=="productUnit"&&key!=="price"&&key!=="vendorLocation"&&key!=="vendorName"&&key!=="vendorImage"&&key!=="imageUrl"&&key!=="likes"&&key!=="id"&&productDetials[key]!==null&&<p key={index}><span>{key}</span> : {productDetials[key]}</p>
                  ))
                }
                 { Object.keys(productDetials.productUnit).map((key,index)=>(
                    key!=="numberOfProductInUnit"&&key!=="id"&&<p key={index}><span>{key}</span> : {productDetials.productUnit[key]}</p>
                    ))
              }
              {
              productDetials.productUnit.type!=="piece"?
              <p><span>number of product in unit</span> : {productDetials.productUnit.numberOfProductInUnit}</p>:""
              }
            </div>

            {/* hiding this div in productDetails in seller page */}
            {!isSeller&&<div className={productDetailsstyle.addToCart}>
              <Link to={`/AddToCart/${productDetials.id}`} className={productDetailsstyle.link}>
                Add To Cart
              </Link>
              <span>
                
                <FaHeart
                  className={ favoriteProducts.indexOf(`product_${id}`)!==-1?`${productDetailsstyle.likeIcon} ${productDetailsstyle.active}`:productDetailsstyle.likeIcon}
                  onClick={(e)=>hindelClickOnLikeIcon(e,id)}
                />
              </span>
            </div>}
          </Col>

            {/* hiding this icons in productDetails in seller page */}
          {!isSeller&&<Col lg={2} md={2} sm={3} className="p-3">
            <div className={productDetailsstyle.otherActions}>
              <FaShare className={productDetailsstyle.otherIcons} />
              <TbExclamationMark className={productDetailsstyle.otherIcons} />
              <IoIosMore className={productDetailsstyle.otherIcons} />
            </div>
          </Col>}
        </Row>
}




        {/* All products are in the same category */}
        {
        !isSeller&&<div>
          <div className={productDetailsstyle.allProducts}>
        {
            allProduct.map((ele)=>(
                <div className={productDetailsstyle.productBox} key={ele.id}>
                    <div className={productDetailsstyle.productImgAndInfo}>
                        <img src={ele.imageUrl[0]} alt='product img' onClick={()=>{navigate(`/DiscoverProducts/${ele.category}/${ele.id}`);window.scrollTo(0,0)}}/>
                        <div className={productDetailsstyle.productInfo}>
                            <h4>{ele.name}</h4>
                            <p><span>price</span>: {ele.price} $</p>
                            {
                               Object.keys(ele).map((key,index)=>(
                                key!=="name"&&key!=="price"&&key!=="productUnit"&&key!=="category"&&key!=="vendorImage"&&key!=="imageUrl"&&key!=="likes"&&key!=="id"&&ele[key]!==null&&<p key={index}><span>{key}</span> : {ele[key]}</p>
                               ))
                            }
                             <p><span>category</span>: {ele.category}</p>
                        </div>
                    </div>
                    <div className={productDetailsstyle.buttonBox}>
                      <Button onClick={()=>{navigate(`/AddToCart/${ele.id}`)}} className={productDetailsstyle.button}>Add To Cart</Button>
                    </div>
                </div>
            ))
        }
        </div>
        </div>
      }

      {/* show feedback */}
      <Feedback id={id}/>
      </Container>
      
    </article>
    </>
   
  );
};
export default ProductDetails;
