import React from "react";
import { useTable } from "react-table";

function TableHeader(props) {
  if (props.position == "hitter") {
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
  } else {
    return (
      <tr>
        <th>Year</th>
        <th>Team</th>
        <th>IP</th>
        <th>Win - Loss</th>
        <th>ERA</th>
        <th>WHIP</th>
        <th>K</th>
        <th>BB</th>
      </tr>
    );
  }
}

export default TableHeader;
