import React from "react";
import "../css/TodayStats.css";
import { getFormattedDate } from "../Functions/Functions";
import { FaShareFromSquare } from "react-icons/fa6";

const TodayStats = (props) => {
  console.log("today stats props", props);

  let writtenDate = new Date(getFormattedDate() + "T00:00:00");

  let originalWrittenDate = writtenDate
    .toDateString("en-US", {
      weekday: "none",
      year: "numeric",
      month: "short",
    })
    .split(" ")
    .slice(1)
    .join(" ")
    .replace(/\b0/g, "");
  length = originalWrittenDate.split(" ").length;
  writtenDate =
    originalWrittenDate
      .split(" ")
      .slice(0, length - 1)
      .join(" ") +
    ", " +
    originalWrittenDate.split(" ").slice(-1);
  return (
    <div className="container">
      <div id="date">{writtenDate}</div>

      <div className="todayScoreHolder">
        <div className="playerPicNameHolder">
          <div className="picHolder">
            <img
              src={props.picUrl}
              className={"todayStatsPic" + props.reveal}
            ></img>
          </div>

          <div className="todayScoreText">{props.name}</div>
        </div>
        <div className="scoreHolder">
          <div className="scoreValue">{props.score}</div>
          <div className="todayScoreText">Score</div>
        </div>
      </div>
      <div id="bottomRow">
        <div id="guessLog">
          {props.guessLog} ({props.score})
        </div>
        <div id="shareContainer">
          <FaShareFromSquare />
          <div id="shareButton">Share</div>
        </div>
      </div>
    </div>
  );
};

export default TodayStats;
