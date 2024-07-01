import React, { useState } from "react";
import ourBlog from "../stylee/ourBlogstyle.module.css";
import img3 from "../images/images (2).jpeg";
import img2 from "../images/images (3).jpeg";
import img1 from "../images/images (4).jpeg";
import userImg from "../images/images.png";
import Blog from "./Blog";
import { Container } from "react-bootstrap";
export const OurBlog = ({blogElement}) => {
  let blogItems = [
    {
      id: "1",
      bgImg: img1,
      title: "5 Tips for healthy and shiny fur",
      subTitle: "Discover effective tips to maintion your pet's fur",
      userImg: userImg,
      name: "Dr.Alex",
    },
    {
      id: "2",
      bgImg: img2,
      title: "Expert Advice Pet Grooming",
      subTitle: "Learn how to keep pet's coat healthy and shiny",
      userImg: userImg,
      name: "Dr.Emily",
    },
    {
      id: "3",
      bgImg: img3,
      title: "Achieve a Glossy Coat for Your Pet",
      subTitle: "Follow expert advice for a Iustorus fur coat",
      userImg: userImg,
      name: "Dr.James",
    },
  ];
  const [bloges, setBloges] = useState(blogItems);
  return (
    <div className={ourBlog.blogBox} ref={blogElement}>
     <Container>
     <h3>Read Our Blog</h3>
      <div className={ourBlog.allBlog}>
        {bloges.map((ele) => (
          <Blog detials={ele} key={ele.id} />
        ))}
      </div>
     </Container>
    </div>
  );
};
export default OurBlog;
