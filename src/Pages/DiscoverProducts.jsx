import React,{ useEffect,useState} from 'react'
import discoverProductsstyle from '../stylee/discoverProductsstyle.module.css'
import SearchForProducts from '../components/SearchForProducts'
import Rating from '../components/Rating'
import SortAndSearchForProducts from '../components/SortAndSearchForProducts'
import AllProducts from '../components/AllProducts'
import Footer from '../components/Footer'
import axios from "axios"
import Loader from '../components/Loader'
import { useParams } from "react-router-dom";

export const DiscoverProducts = () => {
 
  const{category}=useParams()
  const[loadind,setLoadind]=useState(false)
  const [products, setProducts] = useState([]);
  const[displayedProducts,setDisplayedProducts]=useState([])
  const [numberOfItems, setNumberOfItems] = useState(0);
  
  const [searchValue,setSearchValue]=useState("")

  useEffect(()=>{
    setLoadind(true)
      axios.get(`https://souqlysystemsite.runasp.net/api/Home/AllproductsInCategory/${category}`).then((response)=>{
       setProducts(response.data)
       setLoadind(false)
      }).catch((error)=>{
        console.log(error)
        setLoadind(false)
      })
  },[])

  function hindelSerch(e){
    setSearchValue(e.target.value)
    let param=e.target.value
    if(param){
      let filterData = products.filter((ele) => {
          return (ele.name).toUpperCase().includes(param.toUpperCase()) ;
      });
      setDisplayedProducts([...filterData])
      setNumberOfItems(filterData.length)
  } else{
      setDisplayedProducts([])
      setNumberOfItems(0)
    }
  }

  function hindelClickOnClose() {
    setSearchValue("");
    setDisplayedProducts([])
    setNumberOfItems(0)
  }


  // hindelClickEnter
function hindelClickEnter(e){
 if(e.key==="Enter"){
  console.log(searchValue)
    setLoadind(true)
      axios.get(`https://souqlysystemsite.runasp.net/api/Home/search?productName=${searchValue}`).then((response)=>{
        setDisplayedProducts(response.data)
        setNumberOfItems(response.data.length)
       setLoadind(false)
      }).catch((error)=>{
        console.log(error)
        setLoadind(false)
      })
 }
}

  return (
    <>
     {loadind&&<Loader/>}
    <SearchForProducts searchValue={searchValue} hindelSerch={hindelSerch}  hindelClickEnter={hindelClickEnter}/>
    <Rating/>
    <SortAndSearchForProducts searchValue={searchValue} numberOfItems={numberOfItems} hindelClickOnClose={hindelClickOnClose} products={displayedProducts}/>
    <AllProducts/>
    <Footer/>
    </>
  )
}
export default DiscoverProducts;