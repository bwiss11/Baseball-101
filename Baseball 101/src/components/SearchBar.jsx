import React, { useState } from "react";
import "../css/SearchBar.css";
import { players } from "../Functions/Functions";
import allMLBPlayers from "../allMLBPlayers.json";

const SearchBar = ({ setResults, input, setInput }) => {
  const handleChange = (value) => {
    const results = allMLBPlayers.filter((player) => {
      // Value given by user, and the user's input (so far) matches the player's name
      return value && player.toLowerCase().includes(value.toLowerCase());
    });
    setResults(results);
    setInput(value);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        autoComplete="new-password"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
