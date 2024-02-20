import React from "react";
import "../css/SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results, setResults, setInput, setGuess }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            key={id}
            result={result}
            setResults={setResults}
            setInput={setInput}
            setGuess={setGuess}
          />
        );
      })}
    </div>
  );
};

export default SearchResultsList;
