import React from "react";
import "../css/TodayStats.css";
import { getFormattedDate } from "../Functions/Functions";
import { FaShareFromSquare } from "react-icons/fa6";

const TodayStats = (props) => {
  console.log("today stats props", props);

  let writtenDate = new Date(getFormattedDate() + "T00:00:00");

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        text:
          "Baseball 101\n" +
          writtenDate +
          ":\n " +
          props.guessLog +
          " (" +
          props.score +
          ")\n" +
          "baseball101.io",
        // url: "https://www.baseball101.io",
      });
    } else {
      console.log("need to copy to clipboard");
    }
  };

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
          <div className={props.scoreStatus}>{props.score}</div>
          <div className="todayScoreText">Score</div>
        </div>
      </div>
      <div id="bottomRow">
        <div id="guessLog">
          {props.guessLog} ({props.score})
        </div>
        <div id="shareContainer">
          <FaShareFromSquare />
          <div id="shareButton" onClick={shareScore}>
            Share
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayStats;
