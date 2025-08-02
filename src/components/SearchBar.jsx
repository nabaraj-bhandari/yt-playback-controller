import { useState } from "react";
import { Search } from "lucide-react";
import { searchYouTube } from "../utils/youtube";
import SearchResultsDropdown from "./SearchResultsDropdown";
import { useMusicPlayer } from "../hooks/useMusicPlayer";

export default function SearchBar({ onPlay }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { sendCommand } = useMusicPlayer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If it's a YouTube URL, extract the video ID and play directly
    const urlMatch = query.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (urlMatch) {
      onPlay(urlMatch[1]);
      setQuery("");
      setResults([]);
      return;
    }

    // Otherwise search YouTube
    setLoading(true);
    const items = await searchYouTube(query);
    setResults(items);
    setLoading(false);
  };

  return (
    <div className="px-4 mb-4 relative">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:border-amber-500"
          placeholder="YouTube URL or search"
        />
        <button
          type="submit"
          className="px-4 bg-amber-700 text-white rounded-lg hover:bg-amber-600 flex items-center justify-center"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
      <SearchResultsDropdown
        loading={loading}
        results={results}
        onPlay={(videoId) => {
          sendCommand({ command: "playVideo", id: videoId });
        }}
        clearResults={() => {
          setResults([]);
          setQuery("");
        }}
      />
    </div>
  );
}
