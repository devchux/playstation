import React, { memo } from "react";

import "./game.scss";

const Game = ({ active, src, onClick }) => {
  return (
    <div onClick={onClick} className={`game ${active ? "active" : ""}`}>
      <img src={src} alt="" />
    </div>
  );
};

export default memo(Game);
