import React from 'react'
import ratingstyle from '../stylee/ratingstyle.module.css'
import { FaShrimp } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { MdShoppingBag } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { GrDeliver } from "react-icons/gr";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import { FaCertificate } from "react-icons/fa6";


export const Rating = () => {
  return (
    <header>
        <Container>
            <div className={ratingstyle.goBack}>
                <Link to="/" className={ratingstyle.link}><FaArrowLeftLong /> Go Back</Link>
            </div>
            <div className={ratingstyle.ratingAndOffer}>
                <div className={ratingstyle.rating}>
                    <span className={ratingstyle.img}>
                    <FaShrimp className={ratingstyle.shrimpIcon}/>
                    </span>
                    <div>
                        <div className={ratingstyle.titleAndRating}>
                            <p>Twisted Shrimp</p>
                            <div className={ratingstyle.icons}>
                            <span><FaStar className={ratingstyle.icon}/> 4.8</span>
                            <span><FaHeart className={ratingstyle.icon}/></span>
                            </div>
                        </div>
                        <div className={ratingstyle.deliveryBox}>
                            <span><MdShoppingBag className={ratingstyle.icon}/> Min</span>
                            <span><IoMdPricetag className={ratingstyle.icon}/> Sale</span>
                            <span><GrDeliver className={ratingstyle.icon}/> Delivery</span>
                        </div>
                    </div>
                </div>
                <div className={ratingstyle.offer}>
                <FaCertificate/>
                <p>Discover lots of products you might like</p>
                </div>
            </div>
        </Container>
    </header>
  )
}
export default Rating;