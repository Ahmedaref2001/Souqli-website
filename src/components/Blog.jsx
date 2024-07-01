import React from "react";
import blogstyle from "../stylee/blogstyle.module.css";
export const Blog = ({ detials }) => {
  return (
    <div className={blogstyle.blog}>
      <div className={blogstyle.blogImg}>
      <img src={detials.bgImg} alt="blogImg"/>
      </div>
      <h2>{detials.title}</h2>
      <p>{detials.subTitle}</p>
      <div className={blogstyle.userInfo}>
        <img src={detials.userImg} alt="userImg"/>
        <span>{detials.name}</span>
      </div>
    </div>
  );
};
export default Blog;
