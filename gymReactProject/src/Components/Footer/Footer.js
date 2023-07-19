import React from "react";
import "./Footer.css";

import Instagram from "../../assets/instagram.png";
import Github from "../../assets/github.png";
import Linkdin from "../../assets/linkedin.png";
import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <div className="footerContainer">
      <hr />
      <div className="blur blurF"></div>
      <div className="footer">
        <div className="socialLinks">
          <a href="https://instagram.com" target="__blank">
            <img src={Instagram} alt="" />
          </a>
          <a href="https://github.com" target="__blank">
            <img src={Github} alt="" />
          </a>
          <a href="https://linkedin.com" target="__blank">
            <img src={Linkdin} alt="" />
          </a>
        </div>

        <div className="logoF">
          <img src={Logo} alt="" />
          <p>Fitness Heroes</p>
        </div>
        <p className="copyRight">© 2021-2023 webiee. All right reserved.</p>
      </div>
    </div>
  );
}
