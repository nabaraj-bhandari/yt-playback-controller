import { useEffect, useRef } from "react";

export default function SearchResultsDropdown({
  loading,
  results,
  onPlay,
  clearResults,
}) {
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        clearResults();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [clearResults]);

  // Hide when no results and not loading
  if (!loading && results.length === 0) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-1 left-0 right-0 bg-[#2a2a2a] rounded-lg p-2 max-h-60 overflow-y-auto space-y-2 z-50 shadow-lg"
    >
      {loading ? (
        <div className="text-gray-400 text-sm">Searching...</div>
      ) : (
        results.map((video) => (
          <div
            key={video.id}
            className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 rounded-lg p-2"
            onClick={() => {
              onPlay(video.id);
              clearResults();
            }}
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="w-16 h-9 object-cover rounded"
            />
            <div className="text-white text-sm line-clamp-2">{video.title}</div>
          </div>
        ))
      )}
    </div>
  );
}
