import React, { useMemo } from "react";

import { ReactComponent as LogoIcon } from "../../assets/icons/logo.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settings.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/bell.svg";
import { ReactComponent as CrownIcon } from "../../assets/icons/crown.svg";
import { ReactComponent as TargetIcon } from "../../assets/icons/target.svg";
import { ReactComponent as SwordIcon } from "../../assets/icons/cross-sword.svg";

import "./navbar.scss";

const Navbar = () => {
  const navList = useMemo(
    () => ["Home", "Games", "Trophes", "Favourites", "Shop"],
    []
  );
  return (
    <div className="navbar">
      <div className="logo">
        <LogoIcon />
      </div>
      <div className="nav-list">
        {navList.map((x, i) => (
          <div key={i}>{x}</div>
        ))}
      </div>
      <div className="right">
        <div className="info">
          <div className="profile">
            <img src="/images/profile.png" alt="" />
          </div>
          <div className="name-icons">
            <h6>Knight of Kazzar</h6>
            <div className="icons">
              <CrownIcon /> <TargetIcon /> <SwordIcon />
            </div>
          </div>
        </div>
        <div className="notification">
          <BellIcon />
        </div>
        <div className="settings">
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
