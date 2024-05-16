import React from "react";
import "../css/TodayStats.css";
import { getFormattedDate } from "../Functions/Functions";
import { FaShareFromSquare } from "react-icons/fa6";
import { useState, useEffect } from "react";

const TodayStats = (props) => {
  console.log("today stats props", props);

  const [showClipboardMessage, setShowClipboardMessage] = useState(false);

  let writtenDate = new Date(getFormattedDate() + "T00:00:00");

  const shareScore = () => {
    if (navigator.share) {
      navigator.share({
        text:
          "Baseball 101\n" +
          writtenDate +
          "\n " +
          props.guessLog +
          " (" +
          props.score +
          ")\n" +
          "baseball101.io",
        // url: "https://www.baseball101.io",
      });
    } else {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(
          "Baseball 101\n" +
            writtenDate +
            "\n " +
            props.guessLog +
            " (" +
            props.score +
            ")\n" +
            "baseball101.io"
        );
        // alert("Copied to clipboard");
        setShowClipboardMessage(true);
        setTimeout(() => {
          setShowClipboardMessage(false);
        }, 500);
      } else {
        document.execCommand("copy", true, "Text which dsafs you want to copy");
      }
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
    <>
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
          <div id="shareContainer" onClick={shareScore}>
            <FaShareFromSquare />
            <div id="shareButton">Share</div>
          </div>
        </div>
      </div>
      <div className="clipboardMessage">
        <div id="copiedMessage">{showClipboardMessage ? "Copied" : ""}</div>
      </div>
    </>
  );
};

export default TodayStats;
