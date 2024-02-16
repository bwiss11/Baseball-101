import React, { useState } from "react";
import "./SearchBar.css";
import { players } from "../Functions/Functions";

const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value);
    const results = players.filter((player) => {
      // Value given by user, and the user's input (so far) matches the player's name
      return value && player.toLowerCase().includes(value.toLowerCase());
    });
    setResults(results);
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
