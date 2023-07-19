import React from "react";
import "./Plans.css";

import { plansData } from "../../assets/data/plansData";
import whiteTick from "../../assets/whiteTick.png";

export default function Plans() {
  return (
    <div className="plansContainer">
      <div className="blur plansBlur"></div>

      <div className="programsHeader" style={{ gap: "2rem" }}>
        <span className="strokeText"> READY TO START</span>
        <span>YOUR JOURNEY</span>
        <span className="strokeText">NOW WITHUS</span>
      </div>

      {/* plans card */}
      <div className="plans">
        {plansData.map((plan, i) => (
          <div className="plan" key={1}>
            {plan.icon}
            <span>{plan.name}</span>
            <span> ₹ {plan.price} </span>

            <div className="features">
              {plan.features.map((feature, i) => (
                <div className="feature">
                  <img src={whiteTick} alt="" />
                  <span key={i}>{feature} </span>
                </div>
              ))}
            </div>

            <div>
              <span>See More benefits -></span>
            </div>

            <button className="btn"> Join Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
