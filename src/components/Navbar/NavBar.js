import React from "react";
import "./NavBar.scss";
import Logo from "../../assets/Logo.png";

export default function NavBar() {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>Sapiens Contact</span>
        </div>
      </div>
    </nav>
  );
}