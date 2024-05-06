import React from "react";
import { useTable } from "react-table";

function StatsTableHeader() {
  return (
    <tr>
      <th>Date</th>
      <th>Name</th>
      <th>Score</th>
    </tr>
  );
}

export default StatsTableHeader;
