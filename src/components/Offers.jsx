import React, { useState } from "react";
import productImg from "../images/photo-1542291026-7eec264c27ff.png";
import discoverImg from "../images/special-deal-super-offer-upto-60-parcent-off-isolated-3d-render-with-editable-text_47987-15330.png";
import offersstyle from "../stylee/offersstyle.module.css";
import { Link } from "react-router-dom";
export const Offers = () => {
  const [timerDayes, setTimerDayes] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSecends, setTimerSecends] = useState("00");

  const targetTime = new Date("octoper 17, 2024 19:26:00").getTime();
  let timeOut = setInterval(() => {
    const newTime = new Date().getTime();
    const timeDifference = (targetTime - newTime) / 1000;
    let days = Math.floor(timeDifference / (24 * 60 * 60));
    let hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
    let minutes = Math.floor((timeDifference % (60 * 60)) / 60);
    let secends = Math.floor(timeDifference % 60);
    if (timeDifference < 0) {
      clearInterval(timeOut);
    } else {
      setTimerDayes(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSecends(secends);
    }
  }, 1000);

  return (
    <div className={offersstyle.allOffers}>
      <h3 className={offersstyle.title}>Special offers</h3>
      <div className={offersstyle.specialOffers}>
        <div className={offersstyle.box}>
          <h3>Treats</h3>
          <p>by Souqly</p>
          <img src={productImg} alt="productImg" />
          <Link to="/DiscoverProducts/All Categories" className={offersstyle.link}>Buy Now</Link>
          <span className={offersstyle.Discount}>
            <h3>30%</h3>
            <p>Price</p>
          </span>
        </div>
        <div className={offersstyle.box}>
          <h3>New Arrivals</h3>
          <p>Discover New</p>
          <img src={discoverImg} alt="DiscoverImg" />
          <Link to="/DiscoverProducts/All Categories" className={offersstyle.link}>Browse Now</Link>
        </div>
        <div className={offersstyle.box}>
          <h3>Limited Time Offer</h3>
          <p>Ends Soon</p>
          <div className={offersstyle.timeBox}>
            <div className={offersstyle.counterBox}>
              <span>{timerDayes<10?"0"+timerDayes:timerDayes}</span>
              <span>Dayes</span>
            </div>
            <div className={offersstyle.counterBox}>
              <span>{timerHours<10?"0"+timerHours:timerHours}</span>
              <span>Hours</span>
            </div>
            <div className={offersstyle.counterBox}>
              <span>{timerMinutes<10?"0"+timerMinutes:timerMinutes}</span>
              <span>Minutes</span>
            </div>
            <div className={offersstyle.counterBox}>
              <span>{timerSecends<10?"0"+timerSecends:timerSecends}</span>
              <span>Secends</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Offers;
