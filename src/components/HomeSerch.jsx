import React,{useState} from "react";
import homeImg from "../images/d443c970c669eb945ff047dd6dbd171b 1.png";
import homeSerchstyle from "../stylee/homeSerchstyle.module.css";
import { Col, Container, Row } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { IoBulb } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

export const HomeSerch = ({likeActive}) => {

  if(!localStorage.getItem("numberOfLikes")){
    localStorage.setItem("numberOfLikes",1700)
  }
  const[numberOfLikes,setNumberOfLikes]=useState(JSON.parse(localStorage.getItem("numberOfLikes")))
  
  // hindel click like
  function hindelClickLike(ele){
    if(!JSON.parse(localStorage.getItem("likeActive"))){
      localStorage.setItem("likeActive",true)
      ele.target.classList.add(homeSerchstyle.active)
      setNumberOfLikes((prev)=>prev+1)
      localStorage.setItem("numberOfLikes",numberOfLikes+1)
    }else{
      localStorage.removeItem("likeActive")
      ele.target.classList.remove(homeSerchstyle.active)
      setNumberOfLikes((prev)=>prev-1)
      localStorage.setItem("numberOfLikes",numberOfLikes-1)
    }
  }


  return (
    <div className={homeSerchstyle.homeSerchBody} id="home">
      <Container className={homeSerchstyle.container}>
        <Row className={homeSerchstyle.row}>
          {/* section of text and serch input */}
          <Col sm={7} lg={7}>
            <h2>Discover the finest products for your pets</h2>
            <p>Find products by pet, brand, or sale items!</p>
            <div className={homeSerchstyle.serchBox}>
              <div className={homeSerchstyle.inputFild}>
                <input type="text" placeholder="What are you looking for?" />
                <IoSearch className={homeSerchstyle.searchIcon} />
              </div>
              <button className="btn btn-primary">Search</button>
            </div>
            <div className={homeSerchstyle.Interactions}>
              <div className={homeSerchstyle.InteractionInfo}>
                <IoBulb className={homeSerchstyle.icon} />
                <span className={homeSerchstyle.iconInfo}>Souqli's ideas</span>
              </div>
              <div className={homeSerchstyle.InteractionInfo}>
                <AiFillLike className={JSON.parse(localStorage.getItem("likeActive"))?`${homeSerchstyle.icon} ${homeSerchstyle.active}`:homeSerchstyle.icon} onClick={hindelClickLike}/>
                <span className={homeSerchstyle.iconInfo}>
                  <span className={homeSerchstyle.numberOfLikes}>{numberOfLikes}</span>{" "}
                  Like
                </span>
              </div>
            </div>
          </Col>
          {/* section of img */}
          <Col sm={5} lg={4}>
            <div className={homeSerchstyle.bgImg}>
              <img src={homeImg} alt="home img" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default HomeSerch;
