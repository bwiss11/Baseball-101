import React from "react";
import { useTable } from "react-table";

function TableHeader() {
  return (
    <tr>
      <th>Year</th>
      <th>Team</th>
      <th>Hits</th>
      <th>HRs</th>
      <th>RBIs</th>
      <th>AVG / OBP / SLG</th>
      <th>OPS</th>
    </tr>
  );
  //   console.log("logging in tableheader");
  //   let take = props.stats.stats;
  //   let headshot = props.headshot.headshot;
  //   //   console.log(take.stats.stats[3].stat.gamesPlayed);
  //   // take is player's year by year data
  //   console.log("take is ", take);
  //   console.log(headshot);
  //   console.log("take year is ", take[0]);
  //   for (let year in take) {
  //     console.log(take[year]);
  //     console.log(take[0].stat.hits);
  //   }
  //const data = "";
  //   console.log(myData);
  //   console.log("loggin in tableheader");
  //   console.log(myData[3].stat);
  //   const data = React.useMemo(() => myData, []);
  //   const data = React.useMemo(() => take.stats.stats[0], []);
  //   const data = React.useMemo(() => [
  //     {
  //       year: 2021,
  //       hits: 183,
  //       hrs: 36,
  //       rbis: 98,
  //       avg: 0.295,
  //       obp: 0.398,
  //       slg: 0.544,
  //       ops: 0.942,
  //     },
  //   ]);
  //   const data = React.useMemo(() => [
  //     {
  //       season: take[0].season,
  //       hits: take[0].stat.hits,
  //       homeRuns: take[0].stat.homeRuns,
  //       rbi: take[0].stat.rbi,
  //       avg: take[0].stat.avg,
  //       obp: take[0].stat.obp,
  //       ops: take[0].stat.ops,
  //     },
  //   ]);
  //   const columns = React.useMemo(
  //     () => [
  //       {
  //         Header: "Year",
  //         accessor: "season",
  //       },
  //       {
  //         Header: "Hits",
  //         accessor: "hits",
  //       },
  //       {
  //         Header: "Home Runs",
  //         accessor: "homeRuns",
  //       },
  //       {
  //         Header: "RBIs",
  //         accessor: "rbi",
  //       },
  //       {
  //         Header: "Batting Average",
  //         accessor: "avg",
  //       },
  //       {
  //         Header: "On Base Percentage",
  //         accessor: "obp",
  //       },
  //       {
  //         Header: "On Base Plus Slugging",
  //         accessor: "ops",
  //       },
  //     ],
  //     []
  //   );

  // //   //   const columns = React.useMemo(
  // //   //     () => [
  // //   //       {
  // //   //         Header: "Year",
  // //   //         accessor: "year",
  // //   //       },
  // //   //       {
  // //   //         Header: "Hits",
  // //   //         accessor: "hits",
  // //   //       },
  // //   //       {
  // //   //         Header: "Home Runs",
  // //   //         accessor: "hrs",
  // //   //       },
  // //   //       {
  // //   //         Header: "RBIs",
  // //   //         accessor: "rbis",
  // //   //       },
  // //   //       {
  // //   //         Header: "Batting Average",
  // //   //         accessor: "avg",
  // //   //       },
  // //   //       {
  // //   //         Header: "On Base Percentage",
  // //   //         accessor: "obp",
  // //   //       },
  // //   //       {
  // //   //         Header: "Slugging Percentage",
  // //   //         accessor: "slg",
  // //   //       },
  // //   //       {
  // //   //         Header: "On Base + Slugging",
  // //   //         accessor: "ops",
  // //   //       },
  // //   //     ],
  // //   //     []
  // //   //   );

  // //   console.log("headshot is ", headshot);

  // //   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  // //     useTable({ columns, data });

  // //   return (
  // //     <>
  // //       <img className="headshotHolder" src={headshot}></img>
  // //       <div className="App">
  // //         <div className="container">
  // //           <table {...getTableProps()}>
  // //             <thead>
  // //               {headerGroups.map((headerGroup) => (
  // //                 <tr {...headerGroup.getHeaderGroupProps()}>
  // //                   {headerGroup.headers.map((column) => (
  // //                     <th {...column.getHeaderProps()}>
  // //                       {column.render("Header")}
  // //                     </th>
  // //                   ))}
  // //                 </tr>
  // //               ))}
  // //             </thead>
  // //             <tbody {...getTableBodyProps()}>
  // //               {rows.map((row) => {
  // //                 prepareRow(row);
  // //                 return (
  // //                   <tr {...row.getRowProps()}>
  // //                     {row.cells.map((cell) => (
  // //                       <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
  // //                     ))}
  // //                   </tr>
  // //                 );
  // //               })}
  // //             </tbody>
  // //           </table>
  // //         </div>
  // //       </div>
  // //     </>
  // //   );
}

export default TableHeader;
