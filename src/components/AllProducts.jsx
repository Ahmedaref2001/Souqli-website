import React, { useEffect, useState } from "react";
import allProductsstyle from "../stylee/allProductsstyle.module.css";
import { Container } from "react-bootstrap";
import NewProduct from "./NewProduct";
import { useParams } from "react-router-dom";
import Loader from '../components/Loader'
import axios from "axios"

export const AllProducts = () => {
  const[loadind,setLoadind]=useState(false)


 
const{category}=useParams()
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    setLoadind(true)
      axios.get(`https://souqlysystemsite.runasp.net/api/Home/AllproductsInCategory/${category}`).then((response)=>{
       setProducts(response.data)
       console.log(response.data)
       setLoadind(false)
      }).catch((error)=>{
        console.log(error)
        setLoadind(false)
      })
  },[])
 
 
  
  return (
    <>
     {loadind&&<Loader/>}

     <div className={allProductsstyle.AllProductsBox}>
      <Container>
        <h3>You might also like</h3>
       <div className={allProductsstyle.products}>
       {products.map((ele) => (
          <NewProduct props={ele} key={ele.id} />
        ))}
       </div>
      </Container>
    </div>
    </>
    
  );
};
export default AllProducts;
