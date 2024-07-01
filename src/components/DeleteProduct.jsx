import React from 'react'
import deletProductstyle from '../stylee/deleteProductstyle.module.css'
import { Button } from 'react-bootstrap'
export const DeleteProduct = ({productData,hindelPupUpAction}) => {
     
 return (
    <div className={deletProductstyle.pupupPage}>
        <div className={deletProductstyle.pupupBox}>
          <div className={deletProductstyle.images}>
            {
              productData.imageUrl.map((ele,index)=>{
                return <img src={ele} alt='product img' key={index}/>
              })
            }
            
          </div>
          <div className={deletProductstyle.info}>
              {
                  Object.keys(productData).map((key,index)=>(
                    key!=="productUnit"&&key!=="imageUrl"&&key!=="likes"&&key!=="id"&&productData[key]!==null&&<p key={index}> <span>{key}</span> : {productData[key]}</p>
                  ))
              }
          </div>
          <div className={deletProductstyle.actions}>
            <Button className={deletProductstyle.button} onClick={()=>hindelPupUpAction(false)}>Cancel</Button>
            <Button className={deletProductstyle.button} onClick={()=>hindelPupUpAction(true)}>OK</Button>
          </div>
        </div>
    </div>
  )
}
