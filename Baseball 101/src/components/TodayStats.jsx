import React from "react";
import "../css/TodayStats.css";

const TodayStats = (props) => {
  return (
    <div className="container">
      TodayStats
      <div className="todayScoreHolder">
        <div className="playerPicNameHolder">
          <div className="picHolder">
            <img src={props.picUrl} className="todayStatsPic"></img>
          </div>

          <div className="todayScoreText">{props.name}</div>
        </div>
        <div className="scoreHolder">
          <div className="scoreValue">{props.score}</div>
          <div className="todayScoreText">Score</div>
        </div>
      </div>
    </div>
  );
};

export default TodayStats;
