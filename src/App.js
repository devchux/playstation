import { useContext, useEffect, useMemo, useRef } from "react";
import Layout from "./components/layout";
import { AppContextAPI } from "./context/AppContext";

const App = () => {
  const { state } = useContext(AppContextAPI);
  const item =
    state.sortBy === "all"
      ? state.list[state.active]
      : state.filter[state.active];
  const ref = useRef(null);
  const audioRef = useMemo(() => new Audio(), []);

  useEffect(() => {
    let timeout;
    if (ref.current && state.contentHasLoaded) {
      document.querySelector(".preloader").classList.add("loaded");
      ref.current.classList.remove("active");
      audioRef.src = item.audio;
      audioRef.play();
      timeout = setTimeout(() => {
        ref.current.classList.add("active");
      }, 100);
    }

    return () => {
      clearTimeout(timeout);
      audioRef.pause();
      audioRef.currentTime = 0;
    };
  }, [audioRef, item, state.contentHasLoaded]);

  return (
    <div className="app-wrapper">
      <div className="mobile-warning">
        <p> Only available on desktop 😊.</p>
      </div>
      <div className="main">
        <div className="bg-image">
          <img ref={ref} src={item.bg} alt="" />
        </div>
        <Layout />
      </div>
    </div>
  );
};

export default App;
