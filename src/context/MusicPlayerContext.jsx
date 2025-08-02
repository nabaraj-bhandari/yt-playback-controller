// src/context/MusicPlayerContext.jsx
import { createContext, useContext } from "react";
import { useMusicPlayer } from "../hooks/useMusicPlayer";

const MusicPlayerContext = createContext(null);

export function MusicPlayerProvider({ children }) {
  const musicPlayer = useMusicPlayer();
  return (
    <MusicPlayerContext.Provider value={musicPlayer}>
      {children}
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayerContext() {
  const ctx = useContext(MusicPlayerContext);
  if (!ctx)
    throw new Error(
      "useMusicPlayerContext must be used inside MusicPlayerProvider"
    );
  return ctx;
}
