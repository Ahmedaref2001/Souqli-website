import React from "react";
import helpstyle from "../stylee/helpstyle.module.css";
import Button from "react-bootstrap/Button";
import { IoHelpCircle } from "react-icons/io5";
export const Help = ({setShowHelp}) => {
  return (
    <div className={helpstyle.pupupPage}>
      <div className={helpstyle.pupupBox}>
        <h3> <IoHelpCircle className={helpstyle.helpIcon} /> Help</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing. Officiis
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur elit. Officiis
        </p>
        <p>
          Lorem ipsum dolor sit amet adipisicing elit. Officiis
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur  elit. Officiis
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <p>
          Lorem ipsum dolor consectetur adipisicing elit. Officiis
        </p>
        <p>
          Lorem ipsum sit amet consectetur adipisicing elit. Officiis
        </p>
        <Button onClick={()=>{setShowHelp(false)}} className={helpstyle.link}>OK</Button>
      </div>
    </div>
  );
};
export default Help;
