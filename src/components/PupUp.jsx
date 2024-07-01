import React from "react";
import pupupStyle from "../stylee/pupupstyle.module.css";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
export const PupUp = ({page, hidePoupUp}) => {
  
  return (
    <div className={pupupStyle.pupupPage}>
      <div className={pupupStyle.pupupBox}>
        <div className={pupupStyle.iconBox}>
          <TbDiscountCheckFilled className={pupupStyle.icon}/>
        </div>
        <h3>All Is Done</h3>
        <p>Your processing is successful</p>
        <Link to={page}  onClick={() => hidePoupUp()} className={pupupStyle.link}>
          OK
        </Link>
      </div>
    </div>
  );
};
export default PupUp;
