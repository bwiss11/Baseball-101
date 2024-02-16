import React from "react";
import "./SearchResultsList.css";
import SearchResult from "./SearchResult";

const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, id) => {
        return <SearchResult key={id} result={result} />;
      })}
    </div>
  );
};

export default SearchResultsList;
