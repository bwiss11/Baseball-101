import React from "react";
import "../css/PlayerPic.css";

const PlayerPic = (props) => {
  return (
    <img
      style={{ borderColor: "white", borderWidth: "2px" }}
      className={props.props.revealState.reveal}
      src={props.props.url}
    ></img>
  );
};

export default PlayerPic;
