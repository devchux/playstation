import React, { useContext, useMemo, useRef } from "react";
import { ReactComponent as NextIcon } from "../../assets/icons/next.svg";
import { AppContextAPI } from "../../context/AppContext";

import "./categories.scss";

const Categories = () => {
  const { sort, state, playNav } = useContext(AppContextAPI);
  const list = useMemo(
    () => ["All", "Sports", "Adventure", "Action", "Racing"],
    []
  );
  const ref = useRef(null);
  return (
    <div className="categories">
      <h3>My Games</h3>
      <div className="nav-wrapper">
        <button
          className="prev"
          onClick={() => {
            ref.current.style.transform = `translateX(${ref.current.scrollLeft}px)`;
            playNav();
          }}
        >
          <NextIcon />
        </button>
        <div className="list">
          <div ref={ref}>
            {list.map((item) => (
              <button
                onClick={() => sort(item)}
                key={item}
                className={state.sortBy === item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <button
          className="next"
          onClick={() => {
            ref.current.style.transform = `translateX(-${
              (ref.current.clientWidth + 48) / 2
            }px)`;
            playNav();
          }}
        >
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default Categories;
