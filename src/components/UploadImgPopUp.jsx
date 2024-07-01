import React, { useRef, useState } from 'react'
import uploadImgPopUpstyle from '../stylee/uploadImgPopUpstyle.module.css'
import { RiImageAddFill } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Button } from 'react-bootstrap';

export const UploadImgPopUp = ({setUploadImgPopUp,hindleSaveImg}) => {
    const inputRef=useRef()
    const[imgUrl,setImgUrl]=useState("")
    const[imgForm,setImgForm]=useState("")

    function hindleImg(e){
       const reder =new FileReader();
       reder.readAsDataURL(e.target.files[0])
       setImgForm(e.target.files[0])
       reder.onload=()=>{
        if(reder.readyState===2){
            setImgUrl(reder.result)
        }
       }
    }
   

    
  return (
    <div className={uploadImgPopUpstyle.pupupPage}>
    <div className={uploadImgPopUpstyle.pupupBox}>
    {imgUrl===""&&<IoCloseCircleOutline className={uploadImgPopUpstyle.closeBtn} onClick={()=>{setUploadImgPopUp(false)}} />}
      <p>Add Picture To Product</p>

      {imgUrl?<img src={imgUrl} alt='img' onClick={()=>{inputRef.current.click()}}/>:
      <RiImageAddFill className={uploadImgPopUpstyle.addImgIcon} onClick={()=>{inputRef.current.click()}}/>}
      
      <input type='file' ref={inputRef} onChange={hindleImg}/>
      
      {imgUrl?<div className={uploadImgPopUpstyle.saveAndCancelBtn}>
        <Button className={uploadImgPopUpstyle.btn} onClick={()=>{setUploadImgPopUp(false)}}>Cancel</Button>
        <Button className={uploadImgPopUpstyle.btn} onClick={()=>{hindleSaveImg(imgForm,imgUrl)}}>Save</Button>
      </div>:
      <Button className={uploadImgPopUpstyle.uplodeBtn} onClick={()=>{inputRef.current.click()}}>Upload</Button>
      }
    </div>
  </div>
  )
}
export default UploadImgPopUp;