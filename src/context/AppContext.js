import React, { createContext, useReducer } from "react";
import { GAMES } from "../constants";

const initialState = {
  list: GAMES,
  active: 0,
  filter: GAMES,
  sortBy: "All",
  left: "auto",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ACTIVE":
      return {
        ...state,
        active: action.payload,
        left: `-${278 * action.payload}px`,
      };
    case "ADD":
      return { ...state, list: [...state.list, action.payload] };
    case "FILTER":
      const filter = state.list.filter(
        ({ category }) =>
          category.includes(action.payload) || action.payload === "All"
      );
      return {
        ...state,
        filter,
        sortBy: action.payload,
        active: 0,
        left: "auto",
      };
    case "SLIDE":
      return { ...state, left: action.payload };

    default:
      return initialState;
  }
};

export const AppContextAPI = createContext({ state: initialState });

const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const playNav = () => {
    const audio = new Audio("/audio/navigation.mp3");
    audio.play();
  };

  const setActive = (num) => {
    dispatch({ type: "ACTIVE", payload: num });
    playNav();
  };
  const addGame = (game) => dispatch({ type: "ADD", payload: game });
  const sort = (name) => {
    dispatch({ type: "FILTER", payload: name });
    playNav();
  };
  const slide = (left) => dispatch({ type: "SLIDE", payload: left });
  return (
    <AppContextAPI.Provider
      value={{
        state,
        setActive,
        addGame,
        sort,
        slide,
        playNav,
      }}
    >
      {children}
    </AppContextAPI.Provider>
  );
};

export default AppContext;
