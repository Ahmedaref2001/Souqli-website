import React from "react";
import showImgstyle from "../stylee/showImgstyle.module.css";
export const ShowImg = ({ setShowImg, imgUrl }) => {
    function hindelClick(e){
        if(!e.target.hasAttribute("alt")){
            setShowImg(false)
        }
    }
  return (
    <div className={showImgstyle.pupupPage}  onClick={hindelClick}>
      <div className={showImgstyle.pupupBox}>
        <img src={imgUrl} alt="img"/>
      </div>
    </div>
  );
};
export default ShowImg;
