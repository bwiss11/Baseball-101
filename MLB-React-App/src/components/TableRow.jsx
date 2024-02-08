import React from "react";
import { teamAbbreviator } from "../Functions";

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.fullData.season}</td>
      <td>{teamAbbreviator(props.fullData.team)}</td>
      <td>{props.fullData.hits}</td>
      <td>{props.fullData.rbis}</td>
      <td>{props.fullData.homeruns}</td>
      <td>{props.fullData.avg}</td>
      <td>{props.fullData.obp}</td>
      <td>{props.fullData.slg}</td>
      <td>{props.fullData.ops}</td>
    </tr>
  );
};

export default TableRow;
