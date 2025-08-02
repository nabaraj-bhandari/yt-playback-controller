import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load previous state from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("ytSearchState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuery(parsed.query || "");
        setResults(parsed.results || []);
      } catch (e) {
        console.error("Failed to load search state", e);
      }
    }
  }, []);

  // Save to localStorage whenever query/results change
  useEffect(() => {
    localStorage.setItem("ytSearchState", JSON.stringify({ query, results }));
  }, [query, results]);

  return (
    <SearchContext.Provider
      value={{ query, setQuery, results, setResults, loading, setLoading }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
