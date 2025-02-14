import PropTypes from 'prop-types';
import "../css/PlayerPic.css";

const PlayerPic = (props) => {
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
