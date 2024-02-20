import React from "react";
import "../css/SearchResult.css";

const SearchResult = ({ result, setResults, setInput, setGuess }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => {
        setResults([]);
        setGuess(result);
        setInput("");
      }}
    >
      {result}
    </div>
  );
};

export default SearchResult;
