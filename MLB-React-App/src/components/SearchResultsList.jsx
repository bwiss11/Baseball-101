import React from "react";
import "../css/SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results, setResults, setInput }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return (
          <SearchResult
            key={id}
            result={result}
            setResults={setResults}
            setInput={setInput}
          />
        );
      })}
    </div>
  );
};

export default SearchResultsList;
