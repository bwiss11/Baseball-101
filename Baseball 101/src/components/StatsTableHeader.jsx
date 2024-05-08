import React from "react";
import { useTable } from "react-table";

function StatsTableHeader() {
  return (
    <tr>
      <th className="statsTh">Date</th>
      <th className="statsTh">Name</th>
      <th className="statsTh">Score</th>
    </tr>
  );
}

export default StatsTableHeader;
