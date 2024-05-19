import React from "react";
import { useState, useEffect } from "react";
import StatsPlayer from "../components/StatsPlayer";
import TodayStats from "../components/TodayStats";
import MyStats from "../components/MyStats";
import StatsTableHeader from "../components/StatsTableHeader";
import {
  getFormattedDate,
  dailyPlayerGenerator,
  fetchData,
  players,
} from "../Functions/Functions";

const Stats = () => {
  const [hits, setHits] = useState("");
  const [outs, setOuts] = useState("");
  const [numberHits, setNumberHits] = useState(0);
  const [numberOuts, setNumberOuts] = useState(0);
  const [hitStreak, setHitStreak] = useState(0);
  const [maxHitStreak, setMaxHitStreak] = useState(0);
  const [score, setScore] = useState("TBD");
  const [picUrl, setPicUrl] = useState("");
  const [name, setName] = useState("-");
  const [reveal, setReveal] = useState("Hidden");
  const [guessLog, setGuessLog] = useState("");
  const [scoreStatus, setScoreStatus] = useState("scoreNotFinal");

  let curDate = getFormattedDate();

  const fetchInfo = () => {
    let player = dailyPlayerGenerator();
    return fetchData(player);
  };

  useEffect(() => {
    let lastCompleted = JSON.parse(localStorage.getItem("lastCompleted"));

    if (!lastCompleted || (lastCompleted && lastCompleted != curDate)) {
      fetchInfo().then((res) => {
        localStorage.setItem("data", JSON.stringify(res));
        let retrievedPicUrl = JSON.parse(localStorage.getItem("data"))[1];
        setPicUrl(retrievedPicUrl);
      });
      localStorage.setItem("lastCompleted", JSON.stringify(curDate));
      // Resets state if this is the first reload on a new day
      localStorage.setItem("guessLog", "");
      localStorage.removeItem("data");
      localStorage.setItem("count", 0);
      localStorage.setItem("tableData", JSON.stringify([]));
      localStorage.setItem("curDay", "started");
      localStorage.setItem("score", 101);
      setReveal("Hidden");
      setName("-");
    }
    let retrievedGuessLog = localStorage.getItem("guessLog");
    setGuessLog(retrievedGuessLog);
    let retrievedHits = JSON.parse(localStorage.getItem("hits"));
    let hitsArray = [];
    if (retrievedHits) {
      for (let i = 0; i < retrievedHits.length; i++) {
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
    let retrievedData = JSON.parse(localStorage.getItem("data"));
    if (!retrievedData) {
      fetchInfo().then((res) => {
        localStorage.setItem("data", JSON.stringify(res));
        let retrievedPicUrl = JSON.parse(localStorage.getItem("data"))[1];
        setPicUrl(retrievedPicUrl);
        let status = localStorage.getItem("curDay");
        if (!status) {
          localStorage.setItem("curDay", "started");
          setScoreStatus("scoreNotFinal");
        }
        if (status == "scoreFinal" || status == "scoreZero") {
          let retrievedName = JSON.parse(localStorage.getItem("data"))[0][0]
            .player.fullName;
          setName(retrievedName);
          setScore(retrievedScore);
          setReveal("Reveal");
        }
      });
    } else {
      let retrievedPicUrl = JSON.parse(localStorage.getItem("data"))[1];
      setPicUrl(retrievedPicUrl);
      let status = localStorage.getItem("curDay");
      if (status == "scoreFinal" || status == "scoreZero") {
        let retrievedName = JSON.parse(localStorage.getItem("data"))[0][0]
          .player.fullName;
        setName(retrievedName);
        setScore(retrievedScore);
        setReveal("Reveal");
      }

      setOuts(outsArray);
    }
  }, []);

  useEffect(() => {
    let status = localStorage.getItem("curDay");
    if (status == "started") {
      setScoreStatus("scoreNotFinal");
    } else {
      setScoreStatus(status);
    }
  }, [score]);

  if ((hits || score || score == 0) && scoreStatus) {
    console.log("score status", scoreStatus);
    return (
      <div className="statsOuterContainer">
        <TodayStats
          score={score}
          picUrl={picUrl}
          name={name}
          reveal={reveal}
          guessLog={guessLog}
          scoreStatus={scoreStatus}
        ></TodayStats>
        <MyStats
          curHitStreak={hitStreak}
          maxHitStreak={maxHitStreak}
          atBats={numberHits + numberOuts}
          average={(numberHits / (numberHits + numberOuts)).toFixed(3)}
        ></MyStats>
      </div>
    );
  }
};

export default Stats;
