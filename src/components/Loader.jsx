import React from 'react'
import loaderstyle from '../stylee/loaderstyle.module.css'
export const Looding = () => {
  return (
    <div className={loaderstyle.pupupPage}>
      <div className={loaderstyle.pupupBox}>
      <span></span>
      <h4>LOADIND.....</h4>

      </div>
    </div>
  )
}
export default Looding;