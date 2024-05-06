import React from "react";
import { useTable } from "react-table";
import "../css/StatsPlayer.css";

function StatsPlayer(props) {
  // console.log("props date is ", props.date);
  // let writtenDate = new Date(props.date);
  let writtenDate = new Date(props.date + "T00:00:00");

  console.log("date is ", writtenDate);
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
    <tr>
      <td>{writtenDate}</td>
      <td>{props.player}</td>
      <td>{props.score}</td>
    </tr>
  );
}

export default StatsPlayer;

{
  /* <div className="statsContainer">
<img className="statsImage" src={props.imageUrl}></img>
<div className="playerInfoHolder">
  <div className="statsText">{writtenDate}</div>
  <div className="statsText">{props.player}</div>
  <div className="statsText">{props.score}</div>
</div>
</div> */
}
