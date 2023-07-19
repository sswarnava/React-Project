import React from "react";
import "./Programs.css";

import { programsData } from "../../assets/data/programsData";
import rightArrow from "../../assets/rightArrow.png";

export default function Programs() {
  return (
    <div className="programs" id="programs">
      {/* Header */}
      <div className="programsHeader">
        <span className="strokeText">Explore our </span>
        <span>Programs </span>
        <span className="strokeText">to shape yours </span>
      </div>

      <div className="programCategories">
        {programsData.map((program) => (
          <div className="category">
            {program.image}
            <span> {program.heading} </span>
            <span> {program.details}</span>
            <div className="joinNow">
              <span> Join Now</span>
              <img src={rightArrow} alt="" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
