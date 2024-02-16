import React from "react";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import PlayerPic from "../components/PlayerPic";
import SearchBar from "../components/SearchBar";
import SearchResultsList from "../components/SearchResultsList";
import AddTableRow from "../Functions/AddTableRow";
import {
  fetchData,
  randomPlayerGenerator,
  teamAbbreviator,
  players,
} from "../Functions/Functions";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(undefined);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [isClickable, setIsClickable] = useState(false);
  const [reveal, setReveal] = useState("hidden");
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);

  let max = 100;

  const revealPlayer = () => {
    if (reveal !== "reveal") {
      setReveal("reveal");
      setAnswer(data[0][0].player.fullName);
    } else setReveal("hidden");
  };

  const fetchInfo = () => {
    let player = randomPlayerGenerator(players);
    let firstName = player[0];
    let lastName = player[1];
    return fetchData(firstName, lastName);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    console.log("query is", query);
    setSearchQuery(query);
    const filteredResults = players.filter((result) =>
      result.toLowerCase().includes(query.toLowerCase())
    );
    console.log("search results", filteredResults);
    setSearchResults(filteredResults);
  };

  // Runs only when page is reloaded
  useEffect(() => {
    fetchInfo().then((res) => {
      setData(res);
    });
  }, []);

  // runs when count state variable changes
  useEffect(() => {
    if (data) {
      let yearTeam = "";
      if (!data[0][count - 1].team) {
        yearTeam = "Total";
      } else {
        yearTeam = teamAbbreviator(data[0][count - 1].team.name);
      }
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
        console.log("count over length");
      }
      if (count == data[0].length) {
        setIsClickable(true);
      }
    }
  }, [count]);

  if (data) {
    console.log("data", data);

    max = data[0].length;
    return (
      <>
        <div>
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            <SearchResultsList results={results} />
          </div>
        </div>

        <div className="answerHolderHolder">
          <div className="answerHolder">{answer}</div>
        </div>
        <div className="holder">
          <ul className="ulHint">
            <button
              disabled={isClickable}
              onClick={() => setCount(count + 1)}
              className="hintButton"
            >
              Hint
            </button>
          </ul>
          <PlayerPic
            className="playerPic"
            props={{ url: data[1], revealState: { reveal } }}
          />
          <ul className="ulRevealPlayer">
            <button onClick={revealPlayer} className="revealPlayerButton">
              <a>Reveal</a>
            </button>
          </ul>
        </div>
        <table>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.year}</td>
                <td>{row.team}</td>
                <td>{row.hits}</td>
                <td>{row.hrs}</td>
                <td>{row.rbis}</td>
                <td>{row.avg}</td>
                <td>{row.obp}</td>
                <td>{row.slg}</td>
                <td>{row.ops}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
};

export default Home;
