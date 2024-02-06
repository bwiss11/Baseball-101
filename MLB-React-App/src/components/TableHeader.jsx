import React from "react";
import { useTable } from "react-table";

const TableHeader = () => {
  //const data = "";
  const data = React.useMemo(() => [
    {
      year: 2022,
      hits: 200,
      hrs: 34,
      rbis: 112,
      avg: 0.305,
      obp: 0.411,
      slg: 0.566,
      ops: 0.977,
    },
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Year",
        accessor: "year",
      },
      {
        Header: "Hits",
        accessor: "hits",
      },
      {
        Header: "Home Runs",
        accessor: "hrs",
      },
      {
        Header: "RBIs",
        accessor: "rbis",
      },
      {
        Header: "Batting Average",
        accessor: "avg",
      },
      {
        Header: "On Base Percentage",
        accessor: "obp",
      },
      {
        Header: "Slugging Percentage",
        accessor: "slg",
      },
      {
        Header: "On Base + Slugging",
        accessor: "ops",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableHeader;
