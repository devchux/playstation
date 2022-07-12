import React, { useContext } from "react";
import { AppContextAPI } from "../../context/AppContext";
import { ReactComponent as RingIcon } from "../../assets/icons/ring.svg";
import { ReactComponent as RoninIcon } from "../../assets/icons/ronin.svg";
import { ReactComponent as SkullIcon } from "../../assets/icons/skull.svg";
import { ReactComponent as WolfIcon } from "../../assets/icons/wholf.svg";
import { ReactComponent as CrownIcon } from "../../assets/icons/crown2.svg";
import "./details.scss";

const Details = () => {
  const { state } = useContext(AppContextAPI);
  const item = state.filter[state.active];
  const icon = {
    Kingkiller: RingIcon,
    Ronin: RoninIcon,
    "God Slayer": SkullIcon,
    Wolfblood: WolfIcon,
    "King of Wanderers": CrownIcon,
  };
  const Icon = icon[item.earnedTitle]
  return (
    <div className="details">
      <h4>{item.name}</h4>
      <div className="content">
        <div>
          <small>Average Play Time</small>
          <h5>{item.time}</h5>
        </div>
        <div>
          <small>Story Progression</small>
          <h5>{item.progression}%</h5>
        </div>
        <div>
          <small>Last Earned Title</small>
          <div className="with-icon">
            <h5>{item.earnedTitle}</h5>
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
