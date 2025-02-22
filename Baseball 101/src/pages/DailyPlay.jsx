import "../App.css";
import TableHeader from "../components/TableHeader";
import PlayerPic from "../components/PlayerPic";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
import { fetchData, teamAbbreviator, dailyPlayerGenerator, getFormattedDate } from "../Functions/Functions";
import { addGuessPattern, addGuess, addDailyPlayPageView } from "../backend/firestore";
import { useState, useEffect } from "react";
import { FaShareFromSquare } from "react-icons/fa6";
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
  const [showClipboardMessage, setShowClipboardMessage] = useState(false);
  let writtenDate = new Date(getFormattedDate() + "T00:00:00");

  const shareScore = () => {
    console.log("trying to share score");
    if (answerReveal != "answerReveal") {
      return;
    }
    if (navigator.share) {
      navigator.share({
        text: "Baseball 101\n" + writtenDate + "\n " + guesses + " (" + score + ")\n" + "baseball101.io",
      });
    } else {
      if ("clipboard" in navigator) {
        navigator.clipboard.writeText(
          "Baseball 101\n" + writtenDate + "\n " + guesses + " (" + score + ")\n" + "baseball101.io"
        );
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

  useEffect(() => {
    // Adds 1 to the page view counter
    addDailyPlayPageView();

    // Gets the last completed game date
    let lastCompleted = JSON.parse(localStorage.getItem("lastCompleted"));

    if (!lastCompleted || (lastCompleted && lastCompleted != curDate)) {
      const lastStatus = localStorage.getItem("curDay");
      // If user started a game on a previous day and didn't finish, hit streak set to 0
      if (lastStatus && lastStatus == "started") {
        localStorage.setItem("hitStreak", 0);
        let retrievedDate = localStorage.getItem("lastCompleted");
        let retrievedData = JSON.parse(localStorage.getItem("data"));
        let retrievedPlayer = retrievedData[0][0].player.fullName;
        let retrievedGuessLog = localStorage.getItem("guessLog");
        let outs = JSON.parse(localStorage.getItem("outs"));
        // Adds the uncompleted game's player name to the outs array
        if (outs) {
          let lastOut = Object.keys(outs[0])[0];
          if (lastOut != retrievedDate) {
            outs.unshift({
              [retrievedDate]: {
                player: retrievedPlayer,
                score: 0,
                guessLog: retrievedGuessLog,
              },
            });
            localStorage.setItem("outs", JSON.stringify(outs));
          }
        } else {
          let outs = [
            {
              [retrievedDate]: {
                player: retrievedPlayer,
                score: 0,
                guessLog: retrievedGuessLog,
              },
            },
          ];
          localStorage.setItem("outs", JSON.stringify(outs));
        }
      }

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
    if (localStorage.getItem("curDay") == "scoreFinal" || localStorage.getItem("curDay") == "scoreZero") {
      // Sets the day's stats if the user has completed the game for that day
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
              let maxHitStreak = JSON.parse(localStorage.getItem("maxHitStreak"));
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
              [curDate]: { player: answer, score: 0, guessLog: guesses },
            });
            localStorage.setItem("outs", JSON.stringify(outs));
          }
        } else {
          let outs = [{ [curDate]: { player: answer, score: score, guessLog: guesses } }];
          localStorage.setItem("outs", JSON.stringify(outs));
        }
      }
    }
  }, [scoreFinal]);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  useEffect(() => {
    localStorage.setItem("score", score);
  }, [score]);

  const revealPlayer = () => {
    if (reveal !== "reveal") {
      setReveal("reveal");
      setAnswerReveal("answerReveal");
    }
    if (scoreFinal == "scoreNotFinal") {
      setScoreFinal("scoreFinal");
    }
  };

  const revealPlayerLoss = (hint = false, guess = false) => {
    if (scoreFinal == "scoreNotFinal") {
      if (reveal !== "reveal") {
        setReveal("reveal");
        setAnswerReveal("answerReveal");
      }
      setScore(0);
      setScoreFinal("scoreZero");
      if (hint) {
        setGuesses(guesses + "- L");
        addGuessPattern(guesses + "- L");
      } else if (guess) {
        setGuesses(guesses + "X L");
        addGuessPattern(guesses + "X L");
      } else {
        setGuesses(guesses + "L");
        addGuessPattern(guesses + "L");
      }
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
      guess.normalize("NFD").replace(/\p{Diacritic}/gu, "") == answer.normalize("NFD").replace(/\p{Diacritic}/gu, "") &&
      scoreFinal == "scoreNotFinal"
    ) {
      revealPlayer();
      setScoreFinal("scoreFinal");
      setGuesses(guesses + "W");
      addGuessPattern(guesses + "W");
    } else if (guess != "blank" && scoreFinal == "scoreNotFinal") {
      if (score - 15 > 0) {
        setScore(score - 15);
        setGuesses(guesses + "X ");
      } else {
        revealPlayerLoss(false, true);
      }
    }
    if (guess && guess != "blank") {
      addGuess(guess);
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
        }
      }

      if (count == data[0].length) {
        setIsClickable(true);
      }
    }
  }, [count]);

  if (data && data.length) {
    return (
      <div>
        <div>
          <div className="search-bar-container">
            <SearchBar setResults={setResults} setInput={setInput} input={input} />
            <SearchResultsList results={results} setResults={setResults} setInput={setInput} setGuess={setGuess} />
          </div>
        </div>
        <div className="clipboardMessageDailyPlay">
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
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
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
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
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
        <div className={answerReveal}>
          <div className="shareHolder" onClick={shareScore}>
            <div
              id="shareContainerDailyPlay"
              className={`shareHolder ${answerReveal == "answerReveal" ? "" : "disabled"}`}
            >
              <FaShareFromSquare />
              &nbsp;<div>Share</div>
            </div>
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

                    // setScore(score - 1);
                    setGuesses(guesses + "- ");
                    if (score - 1 > 0) {
                      setScore(score - 1);
                    } else {
                      revealPlayerLoss(true, false);
                    }
                  } else {
                    // doesn't count towards score if team is "Total" (player played for multiple teams in one year)
                    if (data[0][count].team) {
                      localStorage.setItem("score", score - 5);
                      setGuesses(guesses + "- ");
                      if (score - 5 > 0) {
                        setScore(score - 5);
                      } else {
                        revealPlayerLoss(true, false);
                      }
                    }
                  }
                  localStorage.setItem("curDay", "started");
                }
              }}
            >
              Hint
            </button>
          </div>
          <div className="playerPicHolder">
            {loading && <PlayerPic className="playerPic" props={{ url: data[1], revealState: { reveal } }} />}
          </div>
          <div className="divHintReveal">
            <button onClick={() => revealPlayerLoss(false, false)} className="revealButton">
              Reveal
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
      </div>
    );
  }
};

export default DailyPlay;
