import React, { useState } from 'react'
import addToCartstyle from '../stylee/addToCartstyle.module.css'
import Navbar from "../components/Navbar";
import { Button, Container } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import OrderTable from '../components/OrderTable';
import ShoppingInfo from '../components/ShoppingInfo';
import Footer from '../components/Footer'
export const AddToCart = () => {
const[checkOutStep,setCheckOutStep]=useState(1)
const[method,setMethod]=useState("Bank")
  return (
   <>
    <Navbar addToCartPage={true}/>
    <div className={addToCartstyle.page}>
        <Container className={addToCartstyle.container}>
            <div className={addToCartstyle.stepAndMethod}>
                <div>
                        <span className={addToCartstyle.checkoutstep}>
                            <p>Shopping Cart</p>
                            <p> / Checkout Step {checkOutStep}/2</p>
                        </span>
                        <p
                        onClick={() => {
                            window.history.back();
                        }}
                        className={addToCartstyle.goBack}
                        >
                        <IoIosArrowBack className={addToCartstyle.arrowBack} /> Go Back
                        </p>
                </div>
                <div className={addToCartstyle.checkoutMethod}>
                    <Button className={method==="Bank"?`${addToCartstyle.button} ${addToCartstyle.active}`:addToCartstyle.button} onClick={()=>{setMethod("Bank")}}>Bank</Button>
                    <Button className={method==="Card"?`${addToCartstyle.button} ${addToCartstyle.active}`:addToCartstyle.button} onClick={()=>{setMethod("Card")}}>Card</Button>
                </div>
            </div>
            <div className={addToCartstyle.shoppingCartAndInfo}>
                <OrderTable checkOutStep={checkOutStep}/>
                <ShoppingInfo checkOutStep={checkOutStep} setCheckOutStep={setCheckOutStep}/>
            </div>
        </Container>
       
    </div>
    <Footer/>
   </>
  )
}
export default AddToCart;