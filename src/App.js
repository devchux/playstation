import { Fragment, useContext, useEffect, useMemo, useRef } from "react";
import Layout from "./components/layout";
import { AppContextAPI } from "./context/AppContext";

const App = () => {
  const { state } = useContext(AppContextAPI);
  const item = state.list[state.active];
  const ref = useRef(null);
  const audioRef = useMemo(() => new Audio(), []);

  useEffect(() => {
    ref.current.classList.remove("active");
    audioRef.src = item.audio;
    audioRef.play();
    const timeout = setTimeout(() => {
      ref.current.classList.add("active");
    }, 100);

    return () => {
      clearTimeout(timeout);
      audioRef.pause();
      audioRef.currentTime = 0;
    };
  }, [audioRef, item]);

  return (
    <Fragment>
      <div className="bg-image">
        <img ref={ref} src={item.bg} alt="" />
      </div>
      <Layout />
    </Fragment>
  );
};

export default App;
