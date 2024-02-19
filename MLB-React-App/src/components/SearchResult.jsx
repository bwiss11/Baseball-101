import React from "react";
import "../css/SearchResult.css";

const SearchResult = ({ result, setResults, setInput }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => {
        alert(`You selected ${result}!`);
        setResults([]);
        // setClear(true);
        // console.log("setting clear to true");
        setInput("");
      }}
    >
      {result}
    </div>
  );
};

export default SearchResult;
