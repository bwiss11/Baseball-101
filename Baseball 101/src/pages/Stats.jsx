import React from "react";
import { useState, useEffect } from "react";
import StatsPlayer from "../components/StatsPlayer";
import TodayStats from "../components/TodayStats";
import StatsTableHeader from "../components/StatsTableHeader";
import { getFormattedDate } from "../Functions/Functions";

const Stats = () => {
  const [hits, setHits] = useState("");
  const [outs, setOuts] = useState("");
  const [numberHits, setNumberHits] = useState(0);
  const [numberOuts, setNumberOuts] = useState(0);
  const [hitStreak, setHitStreak] = useState(0);
  const [maxHitStreak, setMaxHitStreak] = useState(0);
  const [score, setScore] = useState("N/A");
  const [picUrl, setPicUrl] = useState("");
  const [name, setName] = useState("-");

  let curDate = getFormattedDate();

  useEffect(() => {
    let retrievedHits = JSON.parse(localStorage.getItem("hits"));
    let hitsArray = [];
    if (retrievedHits) {
      for (let i = 0; i < retrievedHits.length; i++) {
        // console.log("item is", retrievedHits[i]);
        // console.log("date: ", Object.keys(retrievedHits[i])[0]);
        hitsArray.push({
          date: Object.keys(retrievedHits[i])[0],
          player: retrievedHits[i][Object.keys(retrievedHits[i])[0]].player,
          score: retrievedHits[i][Object.keys(retrievedHits[i])[0]].score,
          imageUrl: retrievedHits[i][Object.keys(retrievedHits[i])[0]].imageUrl,
        });
      }

      setHits(hitsArray);
      setNumberHits(hitsArray.length);
      let yesterdayDate = getFormattedDate(-1);
      if (
        Object.keys(retrievedHits[0])[0] != yesterdayDate &&
        Object.keys(retrievedHits[0])[0] != curDate
      ) {
        setHitStreak(0);
      } else {
        let retrievedCurrentHitStreak = JSON.parse(
          localStorage.getItem("hitStreak")
        );
        setHitStreak(retrievedCurrentHitStreak);
      }
      let retrievedMaxHitStreak = JSON.parse(
        localStorage.getItem("maxHitStreak")
      );

      setMaxHitStreak(retrievedMaxHitStreak);
    }

    let retrievedOuts = JSON.parse(localStorage.getItem("outs"));
    let outsArray = [];

    if (retrievedOuts) {
      for (let i = 0; i < retrievedOuts.length; i++) {
        console.log(retrievedOuts[i][Object.keys(retrievedOuts[i])[0]]);
        outsArray.push({
          date: [Object.keys(retrievedOuts[i])[0]],
          player: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].player,
          score: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].score,
          imageUrl: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].imageUrl,
        });
      }

      setNumberOuts(outsArray.length);
    }

    let retrievedScore = JSON.parse(localStorage.getItem("score"));
    let retrievedPicUrl = JSON.parse(localStorage.getItem("data"))[1];
    setPicUrl(retrievedPicUrl);
    let status = localStorage.getItem("curDay");
    if (status == "scoreFinal" || status == "scoreZero") {
      let retrievedName = JSON.parse(localStorage.getItem("data"))[0][0].player
        .fullName;
      setName(retrievedName);
      setScore(retrievedScore);
    }

    setOuts(outsArray);
  }, []);

  useEffect(() => {
    console.log("score is now", score);
  }, [score]);

  if (hits || score || score == 0) {
    return (
      <div className="statsOuterContainer">
        <div>Current Hit Streak: {hitStreak}</div>
        <div>Max Hit Streak: {maxHitStreak}</div>
        <div>At Bats: {numberHits + numberOuts}</div>
        <div>
          Average: {(numberHits / (numberHits + numberOuts)).toFixed(3)}
        </div>
        <TodayStats score={score} picUrl={picUrl} name={name}></TodayStats>
        {/* <div className="statsPlayerHolder">
          <table id="statsTable">
            {hits.length > 0 ? (
              <tbody>
                <StatsTableHeader></StatsTableHeader>

                {hits.map((day, index) => (
                  <StatsPlayer
                    key={index}
                    date={day.date}
                    player={day.player}
                    score={day.score}
                    imageUrl={day.imageUrl}
                  ></StatsPlayer>
                ))}
              </tbody>
            ) : (
              ""
            )}
            {outs.length > 0 ? (
              <tbody>
                <StatsTableHeader></StatsTableHeader>
                {outs.map((day, index) => (
                  <StatsPlayer
                    key={index}
                    date={day.date}
                    player={day.player}
                    score={day.score}
                    imageUrl={day.imageUrl}
                  ></StatsPlayer>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div> */}
      </div>
    );
  }
};

export default Stats;
