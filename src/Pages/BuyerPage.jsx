import React, { useEffect } from 'react'
import BuyerAccount from '../components/BuyerAccount'
import buyerPagestyle from '../stylee/buyerPagestyle.module.css'
import { useNavigate } from 'react-router-dom'

export const BuyerPage = () => {
  const navigateToLogin=useNavigate()
useEffect(()=>{
  if(!localStorage.getItem("userInfo")){
    navigateToLogin("/Login")
  }
})
  return (
   <BuyerAccount/>
  )
}
export default BuyerPage;