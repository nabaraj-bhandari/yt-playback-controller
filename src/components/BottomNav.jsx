// src/components/BottomNav.jsx
import { Home, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useMusicPlayerContext } from "../context/MusicPlayerContext";

export default function BottomNav() {
  const { isConnected, playerState } = useMusicPlayerContext();

  const noVideo = !playerState.id;

  if (!isConnected || noVideo) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#222] border-t border-gray-700 flex justify-around py-2 z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? "text-amber-500" : "text-gray-400"
          }`
        }
      >
        <Home className="w-6 h-6" />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          `flex flex-col items-center text-sm ${
            isActive ? "text-amber-500" : "text-gray-400"
          }`
        }
      >
        <Search className="w-6 h-6" />
        <span>Search</span>
      </NavLink>
    </div>
  );
}
