import React from "react";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import PlayerPic from "../components/PlayerPic";
import AddTableRow from "../Functions/AddTableRow";
import {
  fetchData,
  randomPlayerGenerator,
  teamAbbreviator,
} from "../Functions/Functions";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(undefined);
  const [count, setCount] = useState(0);
  const [tableData, setTableData] = useState([
    // {
    //   year: "2011",
    //   team: "ARI",
    //   hits: "27",
    //   rbis: "16",
    //   hrs: "5",
    //   avg: ".220",
    //   obp: ".330",
    //   slg: "440",
    //   ops: ".770",
    // },
    // {
    //   year: "2012",
    //   team: "LAA",
    //   hits: "23",
    //   rbis: "36",
    //   hrs: "42",
    //   avg: ".340",
    //   obp: ".330",
    //   slg: "490",
    //   ops: ".890",
    // },
  ]);

  //   const [tableData, setTableData] = useState([
  //     { name: "Alias", age: 34 },
  //     { name: "John", age: 32 },
  //     { name: "Andrew", age: 31 },
  // ]);

  const [newRow, setNewRow] = useState({
    // year: "",
    // team: "",
    // hits: "",
    // hrs: "",
    // rbis: "",
    // avg: "",
    // obp: "",
    // slg: "",
    // ops: "",
  });

  //   let rows = [{"2011", "ARI", "27", "16", "5", ".220", "330", "440", ".770"];
  const addRow = () => {
    console.log("adding row", count, data[0][count]);
    console.log("length is", data[0].length);
    let yearTeam = "";
    if (!data[0][count].team) {
      yearTeam = "Total";
    } else {
      yearTeam = teamAbbreviator(data[0][count].team.name);
    }
    if (count < data[0].length) {
      setTableData([...tableData, newRow]);
      setNewRow({
        year: data[0][count].season,
        team: yearTeam,
        hits: data[0][count].stat.hits,
        hrs: data[0][count].stat.homeRuns,
        rbis: data[0][count].stat.rbi,
        avg: data[0][count].stat.avg,
        obp: data[0][count].stat.obp,
        slg: data[0][count].stat.slg,
        ops: data[0][count].stat.ops,
      });
    } else {
    }
  };

  let max = 100;

  const increment = () => {
    addRow();
    setCount(count + 1);
  };

  //   useEffect(() => {
  //     addRow();
  //   }, []);

  const fetchInfo = () => {
    let player = randomPlayerGenerator();
    // player = ["Josh", "Naylor"];
    let firstName = player[0];
    let lastName = player[1];
    return fetchData(firstName, lastName).then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (data) {
    console.log("data", data);

    max = data[0].length;
    return (
      <>
        <div>{count}</div>
        <div className="holder">
          <ul className="ulHint">
            <li onClick={increment} className="liHint">
              Hint
            </li>
          </ul>
          <PlayerPic pic={{ url: data[1] }} />
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

    // console.log("max is", max);
    // console.log(data[0][0]);
    // return (
    //   <>
    //     <div>
    //       <button onClick={increment}>Hint</button>
    //       <div>{count}</div>
    //     </div>
    //     <div>{data[0][max - count].season}</div>
    //     <PlayerPic pic={{ url: data[1] }} />
    /* //     <div>
    //       <table>
    //         <thead>
    //           <TableHeader />
    //         </thead>
    //         <tbody>
    //           {rows.map((rowData, index) => { */
    //             <tr>
    //               <td>HITHERE</td>
    //             </tr>;
    //           })}
    //         </tbody>
    //         {/* {data[0].map((index) => (
    //         //     <TableRow
    //         //       key={index.season}
    //         //       fullData={{
    //         //         season: index.season,
    //         //         team: index.team.name,
    //         //         hits: index.stat.hits,
    //         //         rbis: index.stat.rbi,
    //         //         homeruns: index.stat.homeRuns,
    //         //         avg: index.stat.avg,
    //         //         obp: index.stat.obp,
    //         //         slg: index.stat.slg,
    //         //         ops: index.stat.ops,
    //         //       }}
    //         //     />
    //         //   ))} */}
    //       </table>
    //     </div>
    //   </>
    //   // <TableRow
    //   //     fullData={{
    //   //       season: data[0][0].season,
    //   //       hits: data[0][0].stat.hits,
    //   //       rbis: data[0][0].stat.rbi,
    //   //       homeruns: data[0][0].stat.homeRuns,
    //   //       avg: data[0][0].stat.avg,
    //   //       obp: data[0][0].stat.obp,
    //   //       slg: data[0][0].stat.slg,
    //   //       ops: data[0][0].stat.ops,
    //   //     }}
    //   //   />
    //   //   <TableRow
    //   //     fullData={{
    //   //       season: data[0][1].season,
    //   //       hits: data[0][1].stat.hits,
    //   //       rbis: data[0][1].stat.rbi,
    //   //       homeruns: data[0][1].stat.homeRuns,
    //   //       avg: data[0][1].stat.avg,
    //   //       obp: data[0][1].stat.obp,
    //   //       slg: data[0][1].stat.slg,
    //   //       ops: data[0][1].stat.ops,
    //   //     }}
    //   //   />
    //   //         </tbody>
    //   //       </table>
    //   //     </div>
    //   //   </>
    // );
  }
};

export default Home;
