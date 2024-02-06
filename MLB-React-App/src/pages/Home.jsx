import React from "react";
import TableHeader from "../components/TableHeader";
import Function from "../Functions";

let myData = await Function("Gunnar", "Henderson");
console.log("logging in Home");
console.log(myData);

const Home = () => {
  return (
    <TableHeader
      textAlign="center"
      stats={{ stats: myData[0] }}
      headshot={{ headshot: myData[1] }}
      style={{ textAlign: "center" }}
    />
  );
};

export default Home;
