import React from 'react'
import { MdOutlineErrorOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import failedpopupstyle from '../stylee/failedpopupstyle.module.css'
export const Failedpopup = ({setShowFailedpopup}) => {
  return (
    <div className={failedpopupstyle.pupupPage}>
    <div className={failedpopupstyle.pupupBox}>
      <div className={failedpopupstyle.iconBox}>
        <MdOutlineErrorOutline className={failedpopupstyle.icon}/>
      </div>
      <h3>Error</h3>
      <p>Your processing is Failed</p>
      <Link  className={failedpopupstyle.link} onClick={()=>{setShowFailedpopup(false)}}>
      Try Again
      </Link>
    </div>
  </div>
  )
}
export default Failedpopup;