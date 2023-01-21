import React, { memo, useContext, useEffect } from "react";
import { AppContextAPI } from "../../context/AppContext";
import Game from "../game";

import "./list.scss";

const List = () => {
  const { state, setActive, slide } = useContext(AppContextAPI);
  useEffect(() => {
    document.onkeydown = function (e) {
      if (e.key === "ArrowRight") {
        if (state.active !== state.filter.length - 1)
          setActive(state.active + 1);
      }
      if (e.key === "ArrowLeft") {
        if (state.active !== 0) setActive(state.active - 1);
      }
    };
  }, [setActive, state]);

  const getDisplacement = () => {
    const factor = state.active <= 1 ? 72 : -36 * state.active;
    const dist = (state.left + factor) / 10;

    return `translateX(${dist}rem)`;
  };

  return (
    <div className="game-list">
      <div style={{ transform: getDisplacement() }}>
        {state.filter.map((game, i) => (
          <Game
            active={state.active === i}
            key={i}
            src={game.img}
            setLeft={slide}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(List);
