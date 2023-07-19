import React from "react";
import "./Home.css";

import hero_image from "../../assets/hero_image.png";
import hero_image_back from "../../assets/hero_image_back.png";
import Heart from "../../assets/heart.png";
import Calories from "../../assets/calories.png";

import { motion } from "framer-motion";
import NumberCounter from "number-counter";

export default function Home() {
  const transition = { type: "spring", duration: 3 };

  const mobile = window.innerWidth <= 768 ? true : false;

  return (
    <div className="home">
      <div className="blur homeBlur"></div>

      <div className="leftHeader">
        {/* <Header /> */}

        <div className="theBestAd">
          <motion.div
            initial={{ left: mobile ? "165px" : "238px" }}
            whileInView={{ left: "8px" }}
            transition={{ ...transition, type: "tween" }}
          ></motion.div>
          <span>The best fitness club in town</span>
        </div>

        <div className="heroText">
          <div>
            <span className="strokeText">Stronger </span>
          </div>
          <div>
            <span>with each rep</span>
          </div>
          <div>
            <span>
              We are what we repeatedly do.
              <br />
              Excellence then is not an act but a habit.
            </span>
          </div>
        </div>

        {/* Figures */}
        <div className="figures">
          <div>
            <span>
              <NumberCounter end={17} start={4} delay="4" preFix="+" />
            </span>
            <span>expert coachs</span>
          </div>
          <div>
            <span>
              <NumberCounter end={587} start={380} delay="4" preFix="+" />
            </span>
            <span>members joined</span>
          </div>
          <div>
            <span>
              <NumberCounter end={25} start={9} delay="4" preFix="+" />
            </span>
            <span>fitness programs</span>
          </div>
        </div>

        {/* buttons */}
        <div className="homeButtons">
          <buttons className="btn">Join Now</buttons>
          <buttons className="btn">Learn More</buttons>
        </div>
      </div>

      <div className="rightHeader">
        <motion.div
          initial={{ right: "-4rem" }}
          whileInView={{ right: "1rem" }}
          transition={transition}
          className="heartRate"
        >
          <img src={Heart} alt="" />
          <span>Heart Rate</span>
          <span>105 bpm</span>
        </motion.div>

        <img src={hero_image} alt="" className="heroImage" />
        <motion.img
          initial={{ right: "5rem" }}
          whileInView={{ right: "12rem" }}
          transition={transition}
          src={hero_image_back}
          alt=""
          className="heroImageBack"
        />

        <motion.div
          className="calories"
          initial={{ right: "15rem" }}
          whileInView={{ right: "13rem" }}
          transition={transition}
        >
          <img src={Calories} alt="" />

          <div>
            <span>Calories Burned</span>
            <span>310 kcal</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
