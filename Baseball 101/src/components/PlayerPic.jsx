import "../css/PlayerPic.css";

const PlayerPic = (props) => {
  console.log("playerpicURL is " + props.props.url);
  return (
    <div className="playerPicContainer">
      <img
        style={{ borderColor: "white", borderWidth: "2px" }}
        className={props.props.revealState.reveal}
        src={props.props.url}
      ></img>
    </div>
  );
};

export default PlayerPic;
