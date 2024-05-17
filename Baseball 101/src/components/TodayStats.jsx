import React from "react";
import "../css/TodayStats.css";
import { getFormattedDate } from "../Functions/Functions";
import { FaShareFromSquare } from "react-icons/fa6";
import { useState, useEffect } from "react";

const TodayStats = (props) => {
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
        }, 1250);
      } else {
      }
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
        <div id="copiedMessage">
          {showClipboardMessage ? (
            <>
              <svg
                viewBox="0 0 20 20"
                height="20px"
                width="20px"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="layer1">
                    {" "}
                    <path d="M 7 0 L 5 2 L 2 2 L 2 20 L 17 20 L 17 2 L 14 2 L 12 0 L 7 0 z M 7.4140625 1 L 11.585938 1 L 14 3.4140625 L 14 4 L 5 4 L 5 3.4140625 L 7.4140625 1 z M 8 2 L 8 3 L 11 3 L 11 2 L 8 2 z M 3 3 L 4 3 L 4 5 L 5 5 L 14 5 L 15 5 L 15 3 L 16 3 L 16 19 L 3 19 L 3 3 z M 4 9 L 4 10 L 15 10 L 15 9 L 4 9 z M 4 11 L 4 12 L 15 12 L 15 11 L 4 11 z M 4 13 L 4 14 L 15 14 L 15 13 L 4 13 z M 4 15 L 4 16 L 15 16 L 15 15 L 4 15 z "></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <svg
                height="20px"
                width="20px"
                fill="#39FF14"
                viewBox="-1.7 0 20.4 20.4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M16.417 10.283A7.917 7.917 0 1 1 8.5 2.366a7.916 7.916 0 0 1 7.917 7.917zm-4.105-4.498a.791.791 0 0 0-1.082.29l-3.828 6.63-1.733-2.08a.791.791 0 1 0-1.216 1.014l2.459 2.952a.792.792 0 0 0 .608.285.83.83 0 0 0 .068-.003.791.791 0 0 0 .618-.393L12.6 6.866a.791.791 0 0 0-.29-1.081z"></path>
                </g>
              </svg>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TodayStats;
