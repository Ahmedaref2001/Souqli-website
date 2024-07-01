import React from "react";
import boxOfCategoriestyle from "../stylee/boxOfCategoriestyle.module.css";
import { Link } from "react-router-dom";

export const BoxOfCategorie = ({ props }) => {

return (
  <div className={boxOfCategoriestyle.box}>
    <img src={props.imageUrl} alt="Img" />
    <div className={boxOfCategoriestyle.boxDetails}>
      <h4>{props.name}</h4>
      <Link to={`/DiscoverProducts/${props.name}`} className={boxOfCategoriestyle.link}>
        Shop Now
      </Link>
    </div>
  </div>
)
};
export default BoxOfCategorie;
