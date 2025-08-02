const API_KEY = import.meta.env.VITE_YT_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export async function searchYouTube(query) {
  const params = new URLSearchParams({
    part: "snippet",
    q: query,
    type: "video",
    maxResults: "8",
    key: API_KEY,
  });

  const url = `${BASE_URL}?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch search results");
  }

  const data = await res.json();

  return data.items.map((item) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumb: item.snippet.thumbnails.medium.url,
  }));
}
