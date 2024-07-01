import React, { useEffect, useState } from 'react'
import myProductsDetailsstyle from '../stylee/myProductsDetailsstyle.module.css'
import { MdOutlineAdd } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { RiSearchLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { DeleteProduct } from './DeleteProduct';
import axios from "axios";
import PupUp from './PupUp';
import Loader from '../components/Loader'
export const MyProductsDetails = () => {
    const[loadind,setLoadind]=useState(false)

// search value
const[searchValue,setSearchValue]=useState("")

const[allProducts,serAllProducts]=useState([])
const[displayedProducts,setDisplayedProducts]=useState([])
const[deleteProduct , setDeleteProduct] =useState(false)
const[deleteProductData , setDeleteProductData] =useState({})

let adminId=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")).id:null

const[showPupUp,setShowPupUp]=useState(false)
useEffect(()=>{
    setLoadind(true)
   
    if(localStorage.getItem("userInfo")){
        axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/vendor-allproducts/${adminId}`).then((response)=>{
            serAllProducts(response.data)
            setDisplayedProducts(response.data)
            //save id for firest product
            JSON.stringify(localStorage.setItem("firestProduct",response.data[0].id))
            setLoadind(false)
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }
   
},[deleteProduct,])


//hindel search function
function hindelSearch(param){
    setSearchValue(param)
    if(param){
        let filterData = allProducts.filter((ele) => {
            return (ele.name).toUpperCase().includes(param.toUpperCase()) ;
        });
        setDisplayedProducts([...filterData])
    }else{
        setDisplayedProducts([...allProducts])
    }
}

// hindel Click On Search
function hindelClickOnSearch(){
    setLoadind(true)
    axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/search?productName=${searchValue}&vendorId=${adminId}`).then((response)=>{
        console.log(response)
        setDisplayedProducts(response.data)
        setLoadind(false)
    }).catch((error)=>{
        console.log(error)
        setLoadind(false)
    })
}


//hindel navigate To Details of product
const navigateToDetails=useNavigate()
function hindelNavegatToDetails(category,id){
    navigateToDetails(`/ProductDetailsPageForSeller/${category}/${id}`)
}


//hindel delete product
function hindelDelet(proId){
    setDeleteProduct(true)
    let proData = allProducts.filter((ele) => {
        return ele.id===proId ;
    });
    setDeleteProductData(...proData)
}

//hindel delete or cancel actions
function hindelDeleteOrCancel(param){
    setLoadind(true)
    if(param){
        axios.delete(`https://souqlysystemsite.runasp.net/api/Vendor/Deleteproduct/${deleteProductData.id}`).then((response)=>{
            console.log(response)
            setDeleteProduct(false)
            setLoadind(false)
            setShowPupUp(true)
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }else{
        setDeleteProduct(param)
    }
   
}

//hindel hiden popup
function hidePoupUp() {
    setShowPupUp(false);
  }

//hindel edit product data
const navigateToEdit=useNavigate()
function hindelEdit(proId){
    navigateToEdit(`/AddProduct/${proId}`)
}


  return (
    <>
    {
        loadind&&<Loader/>
    }
    {
        showPupUp&&<PupUp hidePoupUp={hidePoupUp}/>
    }
    {
        deleteProduct&&<DeleteProduct productData={deleteProductData} hindelPupUpAction={hindelDeleteOrCancel}/>
    }
    <div className={myProductsDetailsstyle.allProductAndSerch}>
        <div className={myProductsDetailsstyle.addAndSerch}>
            <div className={myProductsDetailsstyle.titleAndAdd}>
                <h3 className={myProductsDetailsstyle.title}>My Products</h3>
                <Link to="/AddProduct" className={myProductsDetailsstyle.link}><Button className={myProductsDetailsstyle.button}>Add <MdOutlineAdd/></Button></Link>
            </div>
            <div className={myProductsDetailsstyle.search}>
                <div className={myProductsDetailsstyle.inputFilde}>
                <input type='serch' id='serch' name='serch' placeholder='What are you looking for?' value={searchValue} onChange={(e)=>{hindelSearch(e.target.value)}}/>
                <RiSearchLine className={myProductsDetailsstyle.searchIcon}/>
                </div>
                <Button className={myProductsDetailsstyle.button} onClick={hindelClickOnSearch}>Search</Button>
            </div>
        </div>

        {/* all Products */}
        <div className={myProductsDetailsstyle.allProducts}>
        {
            displayedProducts.map((ele)=>(
                <div className={myProductsDetailsstyle.productBox} key={ele.id}>
                    <div className={myProductsDetailsstyle.productImgAndInfo} onClick={()=>{hindelNavegatToDetails(ele.category,ele.id)}}>
                        <img src={ele.imageUrl[0]} alt='product img'/>
                        <div className={myProductsDetailsstyle.productInfo}>
                            <h4>{ele.name}</h4>
                            <p><span>price</span>: {ele.price} $</p>
                            {
                               Object.keys(ele).map((key,index)=>(
                                key!=="name"&&key!=="price"&&key!=="category"&&key!=="imageUrl"&&key!=="likes"&&key!=="id"&&ele[key]!==null&&<p key={index}><span>{key}</span> : {ele[key]}</p>
                               ))
                            }
                            <p><span>category</span>: {ele.category}</p>
                        </div>
                    </div>
                    <div className={myProductsDetailsstyle.iconsBox}>
                        <span onClick={()=>{hindelEdit(ele.id,ele)}}><FaRegEdit className={myProductsDetailsstyle.icon}/></span>
                       <span onClick={()=>{hindelDelet(ele.id)}}> <MdDelete className={myProductsDetailsstyle.icon}/></span>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
    </>
  )
}
export default MyProductsDetails;