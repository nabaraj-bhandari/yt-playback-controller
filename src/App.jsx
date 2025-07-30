import React, { useState, useEffect } from "react";
import Controls from "./components/Controls";
import ProgressBar from "./components/ProgressBar";
import VolumeControl from "./components/VolumeControl";
import SettingsModal from "./components/SettingsModal";
import Thumbnail from "./components/Thumbnail";
import { useMusicPlayer } from "./hooks/useMusicPlayer";

export default function App() {
  const {
    playerState,
    isConnected,
    isUrlConfigured,
    wsUrl,
    setWsUrl,
    sendCommand,
    showSettings,
    setShowSettings,
    thumbUrl,
  } = useMusicPlayer();

  const [localCurrent, setLocalCurrent] = useState(0);
  const [localVolume, setLocalVolume] = useState(0);

  useEffect(() => {
    setLocalCurrent(playerState.current);
  }, [playerState.current]);

  useEffect(() => {
    setLocalVolume(playerState.volume);
  }, [playerState.volume]);

  // SEEK handlers
  const handleSeekChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalCurrent(value);
  };
  const handleSeekCommit = (e) => {
    const value = parseInt(e.target.value);
    sendCommand({ command: "setCurrent", current: value });
  };

  // VOLUME handlers
  const handleVolumeChange = (e) => {
    const value = parseInt(e.target.value);
    setLocalVolume(value);
  };
  const handleVolumeCommit = (e) => {
    const value = parseInt(e.target.value);
    sendCommand({ command: "setVolume", volume: value });
  };

  const handlePlayPause = () => sendCommand({ command: "playPause" });
  const handlePrevious = () => sendCommand({ command: "previousVideo" });
  const handleNext = () => sendCommand({ command: "nextVideo" });

  const handleRewind = () => {
    const newTime = Math.max(0, localCurrent - 10);
    setLocalCurrent(newTime);
    sendCommand({ command: "setCurrent", current: newTime });
  };

  const handleForward = () => {
    const newTime = Math.min(playerState.duration, localCurrent + 10);
    setLocalCurrent(newTime);
    sendCommand({ command: "setCurrent", current: newTime });
  };

  const noVideo = !playerState.id;

  return (
    <div className="h-auto bg-[#1a1a1a] text-white flex flex-col max-w-md mx-auto relative overflow-hidden p-6">
      {isUrlConfigured && isConnected && !noVideo ? (
        <>
          {/* Thumbnail */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <Thumbnail src={thumbUrl} />
            </div>
          </div>

          {/* Title */}
          <div className="mx-2 text-center my-4 h-24">
            <h1 className="text-lg font-bold">{playerState.title}</h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <ProgressBar
              current={localCurrent}
              duration={playerState.duration}
              onChange={handleSeekChange}
              onCommit={handleSeekCommit}
            />
          </div>

          {/* Controls */}
          <div className="mb-4">
            <Controls
              onPrevious={handlePrevious}
              onRewind={handleRewind}
              onPlayPause={handlePlayPause}
              paused={playerState.paused}
              onForward={handleForward}
              onNext={handleNext}
            />
          </div>

          {/* Volume */}
          <div className="pb-4">
            <VolumeControl
              volume={localVolume}
              onChange={handleVolumeChange}
              onCommit={handleVolumeCommit}
            />
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">🎵</span>
            </div>
            <h2 className="text-xl font-bold mb-2">
              {!isUrlConfigured
                ? "Setup Required"
                : !isConnected
                ? "Not Connected"
                : "No Video Playing"}
            </h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {!isUrlConfigured
                ? "Configure your WebSocket URL to start."
                : !isConnected
                ? "Unable to connect to server. Check settings."
                : "No video is currently playing."}
            </p>
            {!isConnected || !isUrlConfigured ? (
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                {!isUrlConfigured ? "Configure Settings" : "Check Settings"}
              </button>
            ) : null}
          </div>
        </div>
      )}

      {showSettings && (
        <SettingsModal
          wsUrl={wsUrl}
          setWsUrl={setWsUrl}
          setShowSettings={setShowSettings}
        />
      )}
    </div>
  );
}
