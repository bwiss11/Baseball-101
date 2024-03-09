import React from "react";
import TableRow from "../components/TableRow";

const AddTableRow = (props) => {
  console.log("calling AddTableRow");
  return <TableRow fullData={props} />;
};

export default AddTableRow;
