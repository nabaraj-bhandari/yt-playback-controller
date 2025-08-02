//src/pages/PlayerPage.jsx
import { useMusicPlayerContext } from "../context/MusicPlayerContext";
import Controls from "../components/Controls";
import ProgressBar from "../components/ProgressBar";
import VolumeControl from "../components/VolumeControl";
import SettingsModal from "../components/SettingsModal";
import Thumbnail from "../components/Thumbnail";
import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";

export default function PlayerPage() {
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
  } = useMusicPlayerContext();

  const [localCurrent, setLocalCurrent] = useState(playerState.current || 0);
  const [localVolume, setLocalVolume] = useState(playerState.volume || 0);

  useEffect(() => {
    setLocalCurrent(playerState.current);
  }, [playerState.current]);

  useEffect(() => {
    setLocalVolume(playerState.volume);
  }, [playerState.volume]);

  if (!playerState.id && isUrlConfigured && isConnected) {
    return <Navigate to="/search" replace />;
  }

  if (!isUrlConfigured || !isConnected) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-white">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🎵</span>
          </div>
          <h2 className="text-xl font-bold mb-2">
            {!isUrlConfigured ? "Setup Required" : "Not Connected"}
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            {!isUrlConfigured
              ? "Configure your WebSocket URL to start."
              : "Unable to connect to server. Check settings."}
          </p>
          <button
            onClick={() => setShowSettings(true)}
            className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            {!isUrlConfigured ? "Configure Settings" : "Check Settings"}
          </button>
        </div>
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

  const handleSeekChange = useCallback((e) => {
    setLocalCurrent(parseInt(e.target.value));
  }, []);

  const handleSeekCommit = useCallback(
    (e) =>
      sendCommand({ command: "setCurrent", current: parseInt(e.target.value) }),
    [sendCommand]
  );

  const handleVolumeChange = useCallback((e) => {
    setLocalVolume(parseInt(e.target.value));
  }, []);

  const handleVolumeCommit = useCallback(
    (e) =>
      sendCommand({ command: "setVolume", volume: parseInt(e.target.value) }),
    [sendCommand]
  );

  const handlePlayPause = useCallback(
    () => sendCommand({ command: "playPause" }),
    [sendCommand]
  );
  const handlePrevious = useCallback(
    () => sendCommand({ command: "previousVideo" }),
    [sendCommand]
  );
  const handleNext = useCallback(
    () => sendCommand({ command: "nextVideo" }),
    [sendCommand]
  );

  const handleRewind = useCallback(() => {
    const newTime = Math.max(0, localCurrent - 10);
    setLocalCurrent(newTime);
    sendCommand({ command: "setCurrent", current: newTime });
  }, [localCurrent, sendCommand]);

  const handleForward = useCallback(() => {
    const newTime = Math.min(playerState.duration, localCurrent + 10);
    setLocalCurrent(newTime);
    sendCommand({ command: "setCurrent", current: newTime });
  }, [localCurrent, playerState.duration, sendCommand]);

  return (
    <div className="h-auto bg-[#1a1a1a] text-white flex flex-col max-w-md mx-auto px-6 py-4">
      <div className="flex-1 flex items-center justify-center my-4">
        <Thumbnail src={thumbUrl} />
      </div>
      <div className="text-center m-2 h-48 py-2">
        <h1 className="text-md font-bold">{playerState.title}</h1>
      </div>
      <ProgressBar
        current={localCurrent}
        duration={playerState.duration}
        onChange={handleSeekChange}
        onCommit={handleSeekCommit}
      />
      <div className="my-8">
        <Controls
          onPrevious={handlePrevious}
          onRewind={handleRewind}
          onPlayPause={handlePlayPause}
          paused={playerState.paused}
          onForward={handleForward}
          onNext={handleNext}
        />
      </div>
      <div className="p-4">
        <VolumeControl
          volume={localVolume}
          onChange={handleVolumeChange}
          onCommit={handleVolumeCommit}
        />
      </div>
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
