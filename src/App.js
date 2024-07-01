import './App.css';
import React, { useState } from "react";
import {HashRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import NotFound from "./Pages/NotFound"
import DiscoverProducts from "./Pages/DiscoverProducts"
import BuyerPage from "./Pages/BuyerPage"
import ProductDetailsPage from "./Pages/ProductDetailsPage"
import ProductDetailsPageForSeller from "./Pages/ProductDetailsPageForSeller"
import SellerAccountPage from "./Pages/SellerAccountPage"
import MyProductsPage from "./Pages/MyProductsPage"
import AddToCart from "./Pages/AddToCart"
import { AddProduct } from './Pages/AddProduct';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


function App() {
  const [isvendor, setIsvedor] = useState(JSON.parse(localStorage.getItem("isvendor"))?true:false);
  const [userData, setUserData] = useState(localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null);


  return (
    <>
    <HashRouter>
        <Routes>
        
          <Route path="/" element={!isvendor?<Home/>:<MyProductsPage/>}/>
          <Route path="/Login" element={<Login setIsvedorOrNot={setIsvedor} setUserData={setUserData}/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/DiscoverProducts" element={!isvendor?<DiscoverProducts/>:<NotFound/>}/>

          <Route path="/DiscoverProducts/:category" element={!isvendor?<DiscoverProducts/>:<NotFound/>}/>
          
          <Route path='/BuyerPage' element={!isvendor?<BuyerPage/>:<NotFound/>}/>
          <Route path='/ProductDetailsPage' element={!isvendor?<ProductDetailsPage/>:<NotFound/>}/>
          
          <Route path='/DiscoverProducts/:category/:id' element={<ProductDetailsPage/>}/>

          <Route path='/AddToCart' element={!isvendor&&userData?<AddToCart/>:isvendor?<NotFound/>:<Login/>}/>
          <Route path='/AddToCart/:id' element={!isvendor&&userData?<AddToCart/>:isvendor?<NotFound/>:<Login/>}/>
{/* seller pages */}
          <Route path='/ProductDetailsPageForSeller' element={isvendor?<ProductDetailsPageForSeller/>:<NotFound/>}/>
          <Route path='/ProductDetailsPageForSeller/:category/:id' element={isvendor?<ProductDetailsPageForSeller/>:<NotFound/>}/>
          
          <Route path='/AddProduct' element={isvendor?<AddProduct/>:<NotFound/>}/>
          <Route path='/AddProduct/:id' element={isvendor?<AddProduct/>:<NotFound/>}/>
          <Route path='/SellerAccountPage' element={isvendor?<SellerAccountPage/>:<NotFound/>}/>
          <Route path='/MyProductsPage' element={isvendor?<MyProductsPage/>:<NotFound/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
