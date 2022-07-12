import React from "react";
import AddButton from "../button/AddButton";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";

import "./footer.scss";

const Footer = () => {
  return (
    <footer>
      <AddButton>Add New Game</AddButton>
      <div>
        <HomeIcon />
        <p>Home</p>
      </div>
    </footer>
  );
};

export default Footer;
