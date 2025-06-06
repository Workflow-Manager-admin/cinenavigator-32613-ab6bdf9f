import React, { useState } from "react";

// PUBLIC_INTERFACE
function SearchBar({ onSearch, isSearching, placeholder = "Search movies..." }) {
  /**
   * SearchBar component: controlled input for movie search.
   * Calls onSearch with the search string.
   */
  const [input, setInput] = useState("");

  function handleChange(e) {
    setInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim().length > 0) {
      onSearch(input.trim());
    }
  }

  return (
    <form
      className="search-bar"
      style={{
        display: "flex",
        alignItems: "center",
        background: "var(--secondary)",
        borderRadius: 6,
      }}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Movie search"
    >
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search movies"
        style={{
          padding: "6px 12px",
          background: "transparent",
          border: "1px solid var(--border-color)",
          borderRadius: 6,
          color: "var(--text-color)",
          fontSize: 16,
          outline: "none",
          minWidth: 140,
          width: 210,
        }}
      />
      <button
        type="submit"
        className="btn"
        style={{ marginLeft: 10, minWidth: 0 }}
        disabled={isSearching}
        aria-label="Submit search"
      >
        {isSearching ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default SearchBar;
