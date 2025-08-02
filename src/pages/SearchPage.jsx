//src/pages/SettingsPage.jsx
import axios from "axios";
import { useSearch } from "../context/SearchContext";
import { useMusicPlayerContext } from "../context/MusicPlayerContext";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_YT_API_KEY; // from .env
const NO_OF_VIDEOS = 15;
const DEBOUNCE_DELAY = 500; // ms

export default function SearchPage() {
  const { sendCommand, isConnected } = useMusicPlayerContext();
  const { query, setQuery, results, setResults, loading, setLoading } =
    useSearch();
  const navigate = useNavigate();

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) navigate("/");
  }, [isConnected, navigate]);

  const doSearch = useCallback(
    async (q) => {
      const trimmed = q.trim();
      if (!trimmed) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              type: "video",
              maxResults: NO_OF_VIDEOS,
              q: trimmed,
              key: API_KEY,
            },
          }
        );

        const items = res.data.items.map((item) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumb: item.snippet.thumbnails.default.url,
        }));

        setResults(items);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setResults]
  );

  // Debounce search whenever query changes
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      return;
    }

    const handler = setTimeout(() => {
      doSearch(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(handler);
  }, [query, doSearch, setResults]);

  const handlePlay = useCallback(
    (id) => {
      sendCommand({ command: "playVideo", id });
      console.log("command sent for id:", id);
    },
    [sendCommand]
  );

  return (
    <div className="pb-16 px-4 py-4">
      <div className="mb-4 text-white font-bold">
        <input
          className="w-full px-3 py-2 bg-gray-800 rounded-lg outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube..."
          autoFocus
        />
      </div>

      {loading && <div className="text-gray-400 mb-4">Searching...</div>}

      <div className="space-y-2 font-bold">
        {results.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-lg p-2"
            onClick={() => handlePlay(video.id)}
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="w-16 object-cover rounded"
              loading="lazy"
            />
            <div className="text-white text-sm line-clamp-2">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
