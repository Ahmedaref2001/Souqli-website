import React, { useEffect, useState } from 'react'
import feedbackstyle from '../stylee/feedbackstyle.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'
import userImg from '../images/images.png'
import { MdDelete  } from "react-icons/md";
import { Button } from 'react-bootstrap'
import { BsPatchCheckFill } from "react-icons/bs";
export const Feedback = ({id}) => {
//state to loadind
const[loadind,setLoadind]=useState(false)

const[send,setSend]=useState(false)
const[userInfo,setUserInfo]=useState("")
const[isVendor,setIsVendor]=useState(localStorage.getItem('isvendor')?JSON.parse(localStorage.getItem('isvendor')):null)
const[commentText,setCommentText]=useState("")

const[feedbacks,setFeedbacks]=useState([])
useEffect(()=>{

    setUserInfo(localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):"")
    setIsVendor(localStorage.getItem('isvendor')?JSON.parse(localStorage.getItem('isvendor')):null)

    setLoadind(true)
    if(isVendor){
        axios.get(`https://souqlysystemsite.runasp.net/api/Vendor/Product-Feedbacks/${id}`).then((response)=>{
            setFeedbacks(response.data)
            console.log(response.data)
            setLoadind(false)
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }else{
        axios.get(`https://souqlysystemsite.runasp.net/api/Home/Product-Feedbacks/${id}`).then((response)=>{
            setFeedbacks(response.data)
            console.log(response.data)
            setLoadind(false)
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }
    
    setSend(false)
},[send,id])

//hindelSaveComment
function hindelSaveComment(){
    setLoadind(true)
    let comment={
        "productID": id,
        "comment": commentText
    }
    if(isVendor){
        axios.post(`https://souqlysystemsite.runasp.net/api/Vendor/Add-Feedback/${userInfo.id}`,comment).then((response)=>{
            setLoadind(false)
            setSend(true)
            setCommentText("")
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }
    else{
        axios.post(`https://souqlysystemsite.runasp.net/api/Home/Add-Feedback/${userInfo.id}`,comment).then((response)=>{
            setLoadind(false)
            setSend(true)
            setCommentText("")
        }).catch((error)=>{
            console.log(error)
            setLoadind(false)
        })
    }
}

//hindelDeleteFeedback
function hindelDeleteFeedback(param){
    setLoadind(true)
    setSend(true)
    axios.delete(`https://souqlysystemsite.runasp.net/api/Home/Delete-Feedback/${param}`).then((response)=>{
        setSend(false)
        setLoadind(false)
    }).catch((error)=>{
        console.log(error)
        setSend(false)
        setLoadind(false)
    })
}

  return (
    <>
     {loadind&&<Loader/>}

     <h3 className={feedbackstyle.title}>Feedbacks</h3>
<div className={feedbackstyle.addFeedbackBox}>
    <div className={feedbackstyle.img}>
        <img src={userInfo?userInfo.imageUrl:userImg} alt='img'/>
        {
            isVendor&&<BsPatchCheckFill className={feedbackstyle.check}/>
        }
    </div>
    <div className={feedbackstyle.addFeedback}>
        <textarea placeholder='any comment' className={feedbackstyle.feedbackText} onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}></textarea>
        {
            commentText&&<div className={feedbackstyle.icons}>
                <Button className={feedbackstyle.button} onClick={hindelSaveComment}>Send</Button>
                <Button className={feedbackstyle.button} onClick={()=>{setCommentText("")}}>Cancel</Button>
            </div>
        }
    </div>
</div>



     <div className={feedbackstyle.allFeedback}>
        {
            feedbacks.map((ele)=>{
                return <div className={feedbackstyle.feedbackBox} key={ele.feedbackID}>
                    <div className={feedbackstyle.img}>
                        <img src={ele.userImageUrl} alt="img" />
                        {
                            ele.userType==="vendor"&&<BsPatchCheckFill className={feedbackstyle.check}/>
                        }
                    </div>
                    <div className={feedbackstyle.feedbackInfo}>
                        <p>{ele.userName}</p>
                        <Link to={`mailto:${ele.userEmail}`} className={feedbackstyle.link}>{ele.userEmail}</Link>
                        <div>
                            <p>{ele.comment}</p>
                        </div>
                        
                    </div>
                    {
                       ele.userId===userInfo.id&&<span> <MdDelete className={feedbackstyle.icon} onClick={()=>{hindelDeleteFeedback(ele.feedbackID)}}/></span>
                    }
                </div>
            })
        }
        
    </div>
    </>
   
  )
}
export default Feedback