import React from "react";
import TableHeader from "../components/TableHeader";
import TableRow from "../components/TableRow";
import fetchStats from "../Functions";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState(undefined);

  const fetchInfo = () => {
    return fetchStats("Corbin", "Carroll").then((res) => {
      setData(res);
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (data) {
    console.log(data);
    return (
      <>
        <table>
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            <TableRow
              fullData={{
                season: data[0][0].season,
                hits: data[0][0].stat.hits,
                rbis: data[0][0].stat.rbi,
                homeruns: data[0][0].stat.homeRuns,
                avg: data[0][0].stat.avg,
                obp: data[0][0].stat.obp,
                slg: data[0][0].stat.slg,
                ops: data[0][0].stat.ops,
              }}
            />
            {/* <tr>
                <td>{data ? data[0][0].season : ""}</td>
                <td>{data ? data[0][0].stat.avg : ""}</td>
                <td>{data ? data[0][0].stat.avg : ""}</td>
              </tr> */}
          </tbody>
        </table>
      </>
    );
  }
};

export default Home;
