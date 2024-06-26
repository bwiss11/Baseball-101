import React from "react";

function TableHeader(props) {
  if (props.position == "hitter") {
    return (
      <tr className="tableHeaderRow">
        <th>Year</th>
        <th>Team</th>
        <th>Hits</th>
        <th>HRs</th>
        <th>RBIs</th>
        <th>AVG / OBP / SLG</th>
        <th id="OPS">OPS</th>
      </tr>
    );
  } else {
    return (
      <tr className="tableHeaderRow">
        <th>Year</th>
        <th>Team</th>
        <th id="IP">IP</th>
        <th id="WL">W - L</th>
        <th>ERA</th>
        <th>WHIP</th>
        <th id="K">K</th>
        <th>BB</th>
      </tr>
    );
  }
}

export default TableHeader;
