import "../App.css";
import React from "react";
import TableHeader from "../components/TableHeader";
import PlayerPic from "../components/PlayerPic";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
import {
  fetchData,
  teamAbbreviator,
  dailyPlayerGenerator,
  getFormattedDate,
} from "../Functions/Functions";
import { useState, useEffect } from "react";

const DailyPlay = () => {
  const [data, setData] = useState(undefined);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isClickable, setIsClickable] = useState(false);
  const [reveal, setReveal] = useState("hidden");
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState("blank");
  const [answerReveal, setAnswerReveal] = useState("answerHidden");
  const [scoreFinal, setScoreFinal] = useState("scoreNotFinal");
  const [score, setScore] = useState(101);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState("");
  const [guesses, setGuesses] = useState("");
  const curDate = getFormattedDate();

  useEffect(() => {
    let lastCompleted = JSON.parse(localStorage.getItem("lastCompleted"));

    if (!lastCompleted || (lastCompleted && lastCompleted != curDate)) {
      localStorage.setItem("lastCompleted", JSON.stringify(curDate));
      // Resets state if this is the first reload on a new day
      setData(undefined);
      localStorage.setItem("guessLog", "");
      localStorage.removeItem("data");
      setCount(0);
      localStorage.setItem("count", 0);
      setTableData([]);
      localStorage.setItem("tableData", JSON.stringify([]));
      setIsClickable(false);
      setReveal("hidden");
      setAnswer("");
      setResults([]);
      setInput("");
      setGuess("blank");
      setAnswerReveal("answerHidden");
      setScoreFinal("scoreNotFinal");
      localStorage.setItem("curDay", "started");
      setScore(101);
      localStorage.setItem("score", 101);
      setLoading(true);
      setPosition("");
    } else {
      localStorage.setItem("lastCompleted", JSON.stringify(curDate));
    }

    if (
      localStorage.getItem("curDay") == "scoreFinal" ||
      localStorage.getItem("curDay") == "scoreZero"
    ) {
      let retrievedData = JSON.parse(localStorage.getItem("data"));
      let retrievedTableData = JSON.parse(localStorage.getItem("tableData"));
      let retrievedScore = localStorage.getItem("score");
      let retrievedGuessLog = localStorage.getItem("guessLog");
      setGuesses(retrievedGuessLog);
      setData(retrievedData);
      setTableData(retrievedTableData);
      if (localStorage.getItem("curDay") == "scoreFinal") {
        setScoreFinal("scoreFinal");
      } else {
        setScoreFinal("scoreZero");
      }
      setScore(retrievedScore);
      setReveal("reveal");
      setAnswerReveal("answerReveal");
    } else if (localStorage.getItem("curDay") == "started") {
      let retrievedData = JSON.parse(localStorage.getItem("data"));
      let retrievedTableData = JSON.parse(localStorage.getItem("tableData"));
      let retrievedScore = localStorage.getItem("score");
      let retrievedCount = localStorage.getItem("count");
      let retrievedGuessLog = localStorage.getItem("guessLog");
      setGuesses(retrievedGuessLog);
      setData(retrievedData);
      setTableData(retrievedTableData);
      setScore(retrievedScore);
      setCount(Number(retrievedCount));
    }

    const removeLoader = () => setLoading(false);
    window.addEventListener("load", removeLoader);
    return window.removeEventListener("load", removeLoader);
  }, []);

  useEffect(() => {
    localStorage.setItem("guessLog", guesses);
  }, [guesses]);

  useEffect(() => {
    if (scoreFinal == "scoreFinal" || scoreFinal == "scoreZero") {
      localStorage.setItem("tableData", JSON.stringify(tableData));
      localStorage.setItem("data", JSON.stringify(data));
      localStorage.setItem("score", score);

      if (scoreFinal == "scoreFinal") {
        localStorage.setItem("curDay", "scoreFinal");

        let hits = JSON.parse(localStorage.getItem("hits"));
        if (hits) {
          let lastHit = Object.keys(hits[0])[0];
          let yesterdayDate = getFormattedDate(-1);
          // localStorage.setItem("hitStreak", 1);
          let hitStreak = JSON.parse(localStorage.getItem("hitStreak"));

          if (lastHit != curDate) {
            if (lastHit == yesterdayDate) {
              hitStreak++;
              localStorage.setItem("hitStreak", hitStreak);
              let maxHitStreak = JSON.parse(
                localStorage.getItem("maxHitStreak")
              );
              if (hitStreak > maxHitStreak) {
                localStorage.setItem("maxHitStreak", hitStreak);
              }
            } else {
              localStorage.setItem("hitStreak", 1);
            }
            hits.unshift({
              [curDate]: {
                player: answer,
                score: score,
                guessLog: guesses,
              },
            });
            localStorage.setItem("hits", JSON.stringify(hits));
          }
        } else {
          let hits = [
            {
              [curDate]: {
                player: answer,
                score: score,
                guessLog: guesses,
              },
            },
          ];
          localStorage.setItem("hits", JSON.stringify(hits));
          localStorage.setItem("hitStreak", 1);
          localStorage.setItem("maxHitStreak", 1);
        }
      } else {
        localStorage.setItem("curDay", "scoreZero");
        localStorage.setItem("hitStreak", 0);

        let outs = JSON.parse(localStorage.getItem("outs"));

        if (outs) {
          let lastOut = Object.keys(outs[0])[0];
          if (lastOut != curDate) {
            outs.unshift({
              [curDate]: { player: answer, score: score, guessLog: guesses },
            });
            localStorage.setItem("outs", JSON.stringify(outs));
          }
        } else {
          let outs = [
            { [curDate]: { player: answer, score: score, guessLog: guesses } },
          ];
          localStorage.setItem("outs", JSON.stringify(outs));
        }
      }
    }
  }, [scoreFinal]);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const revealPlayer = () => {
    if (reveal !== "reveal") {
      setReveal("reveal");
      setAnswerReveal("answerReveal");
    }
    if (scoreFinal == "scoreNotFinal") {
      setScoreFinal("scoreFinal");
    }
  };

  const revealPlayerLoss = () => {
    if (scoreFinal == "scoreNotFinal") {
      if (reveal !== "reveal") {
        setReveal("reveal");
        setAnswerReveal("answerReveal");
      }
      setScore(0);
      setScoreFinal("scoreZero");
      setGuesses(guesses + "L");
    }
  };

  const fetchInfo = () => {
    let player = dailyPlayerGenerator();
    return fetchData(player);
  };

  // Runs only when page is reloaded
  useEffect(() => {
    fetchInfo().then((res) => {
      setData(res);
      localStorage.setItem("data", JSON.stringify(res));
      setAnswer(res[0][0].player.fullName);
      if (res[2] == "pitching") {
        setPosition("pitcher");
      } else {
        setPosition("hitter");
      }
    });
  }, []);

  useEffect(() => {
    if (
      guess
        .replace("í", "i")
        .replace("í", "i")
        .replace("é", "e")
        .replace("é", "e")
        .replace("á", "a")
        .replace("ó", "o")
        .replace("ú", "u")
        .replace("ñ", "n") ==
        answer
          .replace("í", "i")
          .replace("í", "i")
          .replace("é", "e")
          .replace("é", "e")
          .replace("á", "a")
          .replace("ó", "o")
          .replace("ú", "u")
          .replace("ñ", "n") &&
      scoreFinal == "scoreNotFinal"
    ) {
      revealPlayer();
      setScoreFinal("scoreFinal");
      setGuesses(guesses + "W");
    } else if (guess != "blank" && scoreFinal == "scoreNotFinal") {
      if (score - 15 > 0) {
        setScore(score - 15);
      } else {
        revealPlayerLoss();
      }
      setGuesses(guesses + "X ");
    }
  }, [guess]);

  // runs when count state variable changes
  useEffect(() => {
    if (data && data.length) {
      let yearTeam = "";
      if (!data[0][count - 1].team) {
        yearTeam = "Total";
      } else {
        yearTeam = teamAbbreviator(data[0][count - 1].team.name);
      }

      // For hitters:
      if (position == "hitter") {
        if (count < data[0].length + 1) {
          let newRow = {
            year: data[0][count - 1].season,
            team: yearTeam,
            hits: data[0][count - 1].stat.hits,
            hrs: data[0][count - 1].stat.homeRuns,
            rbis: data[0][count - 1].stat.rbi,
            avg: data[0][count - 1].stat.avg,
            obp: data[0][count - 1].stat.obp,
            slg: data[0][count - 1].stat.slg,
            ops: data[0][count - 1].stat.ops,
          };
          setTableData([...tableData, newRow]);
        } else {
        }
      } else if (position == "pitcher") {
        // For pitchers:
        if (count < data[0].length + 1) {
          let newRow = {
            year: data[0][count - 1].season,
            team: yearTeam,
            inningsPitched: data[0][count - 1].stat.inningsPitched,
            wins: data[0][count - 1].stat.wins,
            losses: data[0][count - 1].stat.losses,
            era: data[0][count - 1].stat.era,
            whip: data[0][count - 1].stat.whip,
            strikeouts: data[0][count - 1].stat.strikeOuts,
            walks: data[0][count - 1].stat.baseOnBalls,
          };
          setTableData([...tableData, newRow]);
        } else {
        }
      }

      if (count == data[0].length) {
        setIsClickable(true);
      }
    }
  }, [count]);

  if (data && data.length) {
    return (
      <>
        <div>
          <div className="search-bar-container">
            <SearchBar
              setResults={setResults}
              setInput={setInput}
              input={input}
            />
            <SearchResultsList
              results={results}
              setResults={setResults}
              setInput={setInput}
              setGuess={setGuess}
            />
          </div>
        </div>
        <div id="score" className={scoreFinal}>
          {score}
        </div>
        <div className="answerHolder">
          <div className={answerReveal}>{answer}</div>
        </div>
        <div className="holder">
          <div className="divHintReveal">
            <button
              className="hintButton"
              disabled={isClickable}
              onClick={() => {
                if (scoreFinal == "scoreNotFinal" && score > 0) {
                  localStorage.setItem("count", count + 1);
                  setCount(count + 1);
                  if (count == 0) {
                    localStorage.setItem("score", score - 1);
                    setScore(score - 1);
                    setGuesses(guesses + "- ");
                  } else {
                    localStorage.setItem("score", score - 5);
                    setScore(score - 5);
                    setGuesses(guesses + "- ");
                  }
                  localStorage.setItem("curDay", "started");
                }
              }}
            >
              Hint
            </button>
          </div>
          <div className="playerPicHolder">
            {loading && (
              <PlayerPic
                className="playerPic"
                props={{ url: data[1], revealState: { reveal } }}
              />
            )}
          </div>
          <div className="divHintReveal">
            <button onClick={revealPlayerLoss} className="revealButton">
              <a>Reveal</a>
            </button>
          </div>
        </div>
        <table>
          <thead>
            <TableHeader position={position} />
          </thead>
          <tbody>
            {position == "hitter"
              ? tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.year}</td>
                    <td>{row.team}</td>
                    <td>{row.hits}</td>
                    <td>{row.hrs}</td>
                    <td>{row.rbis}</td>
                    <td>
                      {row.avg} / {row.obp} / {row.slg}
                    </td>
                    <td>{row.ops}</td>
                  </tr>
                ))
              : tableData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.year}</td>
                    <td>{row.team}</td>
                    <td>{row.inningsPitched}</td>
                    <td>
                      {row.wins} - {row.losses}
                    </td>
                    <td>{row.era}</td>
                    <td>{row.whip}</td>
                    <td>{row.strikeouts}</td>
                    <td>{row.walks}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default DailyPlay;
