import React, { createContext, useEffect, useMemo, useReducer } from "react";
import { GAMES } from "../constants";

const initialState = {
  list: GAMES,
  active: 0,
  filter: GAMES,
  sortBy: "All",
  left: "auto",
  contentHasLoaded: false,
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
    case "CONTENT_LOADED":
      return { ...state, contentHasLoaded: true };
    case "CONTENT_NOT_LOADED":
      return { ...state, contentHasLoaded: false };
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

  const onContentLoaded = () => dispatch({ type: "CONTENT_LOADED" });

  const allMediaGroup = useMemo(() => {
    return GAMES.reduce((a, data) => {
      const images = [data.bg, data.img];
      const audios = [data.audio];

      const links = { audios, images };

      return a.concat(links);
    }, []);
  }, []);

  const allMedia = useMemo(() => {
    return allMediaGroup.reduce((a, data) => {
      a.images = a.images ? [...a.images, ...data.images] : [];
      a.audios = a.audios ? [...a.audios, ...data.audios] : [];

      return a;
    }, {});
  }, [allMediaGroup]);

  const loadMedia = () => {
    let progress = 0;
    allMedia.images.forEach(async (url) => {
      const response = await fetch(url);
      const image = new Image();

      image.onload = () => {
        progress += 1;
      };

      image.onerror = (e) => {
        console.log("img-err", url, progress, e.message);
      };
      image.src = response.url;
    });
    allMedia.audios.forEach(async (url) => {
      const response = await fetch(url);
      const audio = new Audio();

      audio.oncanplaythrough = () => {
        progress += 1;

        if (progress === [...allMedia.images, ...allMedia.audios].length) {
          onContentLoaded();
        }
      };
      audio.onerror = () => {
        console.log("err", url, progress);
      };
      audio.src = response.url;
    });
  };

  useEffect(() => {
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
