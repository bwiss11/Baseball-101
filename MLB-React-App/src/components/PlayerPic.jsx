import React from "react";

const PlayerPic = (props) => {
  return (
    <img className={props.props.revealState.reveal} src={props.props.url}></img>
  );
};

export default PlayerPic;
