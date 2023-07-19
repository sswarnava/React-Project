import React from "react";
import "./Reasons.css";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import image4 from "../../assets/image4.png";
import nb from "../../assets/nb.png";
import adidas from "../../assets/adidas.png";
import nike from "../../assets/nike.png";
import tick from "../../assets/tick.png";

export default function Reasons() {
  return (
    <div className="reasons">
      <div className="leftSide">
        <img src={image1} alt="" className="lSideFirstImg" />
        <img src={image2} alt="" className="lSideSecoundImg" />
        <img src={image3} alt="" className="lSideThirdImg" />
        <img src={image4} alt="" className="lSideForthImg" />
      </div>

      <div className="rightSide">
        <span>some reasons</span>
        <div>
          <span className="strokeText">why</span>
          <br />
          <span>Choose us?</span>
        </div>

        <div className="details">
          <div>
            <img src={tick} alt="" />
            <span>OVER 18+ EXPERT COACHS</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>TRAIN SMARTER AND FASTER </span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>6 FREE PROGRAM FOR NEW MEMBER</span>
          </div>
          <div>
            <img src={tick} alt="" />
            <span>RELIABLE PARTNERS</span>
          </div>
        </div>
        <span
          style={{
            color: "var(--gray)",
            fontWeight: "normal",
          }}
        >
          OUR PARTNERS
        </span>
        <div className="partners">
          <img src={nb} alt="" />
          <img src={adidas} alt="" />
          <img src={nike} alt="" />
        </div>
      </div>
    </div>
  );
}
