import React, { useEffect, useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../../assets/logo.png";
import "./Header.css";

export default function Header() {
  const [Mobile, setMobile] = useState(false);

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 300);
      // console. log (widow.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header className={sticky ? "headerScrollEfact" : " "}>
      <div className="headerLeft">
        <img src={Logo} alt="" />
        <p>Fitness Heroes</p>
      </div>

      <div className="headerRight">
        <nav className={Mobile ? "mobileNavbar" : "navBar"}>
          <ul>
            <li>Home</li>
            <li>why us</li>
            <li>Plans</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      <div className="menuIcon" onClick={() => setMobile(!Mobile)}>
        {Mobile ? (
          <AiOutlineClose className="menu" />
        ) : (
          <AiOutlineMenu className="menu" />
        )}
      </div>
    </header>
  );
}
