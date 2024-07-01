import React, { useState ,useEffect} from "react";
import axios from "axios"
import trendingProductsstyle from "../stylee/trendingProductsstyle.module.css";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Product from "./Product";
import PopularCategoties from "./PopularCategoties";
import Loader from '../components/Loader'
export const TrendingProducts = () => {
  //state to loadind
  const[loadind,setLoadind]=useState(false)

  let firestIndex = 0,
  lastIndex = 6;

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [popularCategoties, setPopularCategoties] = useState([]);
  const [viewProducts, setViewProducts] = useState([]);

  useEffect(() => {
    setLoadind(true)
    axios
      .get("https://souqlysystemsite.runasp.net/api/Home/User-home")
      .then((res) => {
        setTrendingProducts(res.data.trendingProducts)
        setPopularCategoties(res.data.popularCategories)
         setViewProducts(res.data.trendingProducts.slice(firestIndex,lastIndex))
         setLoadind(false)
      })
      .catch((res) => {
        console.log(res);
        setLoadind(false)
      });
  }, []);

  

  

  //hindel Click On Prev
  function hindelClickOnPrev(){
   if(firestIndex>0){
    firestIndex-=6
    lastIndex=firestIndex+6
   }
   setViewProducts(trendingProducts&&trendingProducts.slice(firestIndex,lastIndex))
  }

  //hindel Click On Next
  function hindelClickOnNext(){
    if(lastIndex+6<=trendingProducts.length){
      lastIndex+=6
      firestIndex+=6
    }else if(lastIndex<trendingProducts.length){
      lastIndex=trendingProducts.length
      firestIndex+=6
    }
    setViewProducts(trendingProducts&&trendingProducts.slice(firestIndex,lastIndex))
  }
  
  return (
    <>
    {loadind&&<Loader/>}
      <div className={trendingProductsstyle.trendingProducts}>
        <h4>Trending products</h4>
        <span className={trendingProductsstyle.arrowIcon}>
          <IoIosArrowBack className={trendingProductsstyle.icon} onClick={hindelClickOnPrev}/>
          <IoIosArrowForward className={trendingProductsstyle.icon} onClick={hindelClickOnNext}/>
        </span>
      </div>
      <div className={trendingProductsstyle.allProducts}>
        {viewProducts.map((ele) => (
          <Product details={ele} key={ele.id} />
        ))}
      </div>

      <div className={trendingProductsstyle.popularCategoties}>
        <h4>Pooular Categories</h4>
      </div>
      <div className={trendingProductsstyle.allPopularCategoties}>
        {popularCategoties.map((ele) => (
          <PopularCategoties details={ele} key={ele.id} />
        ))}
      </div>
    </>
  );
};
export default TrendingProducts;
