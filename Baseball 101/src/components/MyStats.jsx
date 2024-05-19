import React from "react";
import "../css/MyStats.css";

const MyStats = (props) => {
  let average = props.average;
  if (average.slice(0, 1) == "0") {
    average = average.slice(1, average.length);
  }

  if (isNaN(average)) {
    average = ".000";
  }
  return (
    <div className="myStatsContainer">
      <div id="date">My Stats</div>
      <div className="firstRow">
        <div className="statsContainer" id="rightStatsContainer">
          <div className="textTop">Current Hit Streak</div>
          <div className="myStatsValue">{props.curHitStreak}</div>
        </div>
        <div className="statsContainer">
          <div className="textTop">Max Hit Streak</div>
          <div className="myStatsValue">{props.maxHitStreak}</div>
        </div>
      </div>
      <div className="secondRow">
        <div className="statsContainer" id="rightStatsContainer">
          <div className="textTop">Average</div>
          <div className="myStatsValue">{average}</div>
        </div>
        <div className="statsContainer">
          <div className="textTop">At Bats</div>
          <div className="myStatsValue">{props.atBats}</div>
        </div>
      </div>
    </div>
  );
};

export default MyStats;
