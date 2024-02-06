import React from "react";
import TableHeader from "../components/TableHeader";
import Function from "../Functions";

let myData = await Function("Adley", "Rutschman");
console.log("logging in Home");
console.log(myData);

const Home = () => {
  return (
    <TableHeader
      textAlign="center"
      stats={{ stats: myData }}
      style={{ textAlign: "center" }}
    />
  );
};

export default Home;
