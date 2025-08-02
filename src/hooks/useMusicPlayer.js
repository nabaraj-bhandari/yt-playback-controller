import { useState, useEffect, useRef } from "react";

export function useMusicPlayer() {
  const [playerState, setPlayerState] = useState({
    title: "",
    duration: 0,
    current: 0,
    paused: true,
    volume: 0,
    id: "",
  });

  const [thumbUrl, setThumbUrl] = useState(
    "https://placehold.co/400x400?text=YouTube"
  );
  const [isConnected, setIsConnected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [wsUrl, setWsUrl] = useState(null);
  const wsRef = useRef(null);

  const isUrlConfigured = !!wsUrl;

  useEffect(() => {
    const saved = localStorage.getItem("musicPlayerWsUrl");
    if (saved) setWsUrl(saved);
  }, []);

  useEffect(() => {
    if (!wsUrl) return;

    const connect = () => {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => setIsConnected(true);
      ws.onclose = () => {
        setIsConnected(false);
        setTimeout(connect, 3000);
      };
      ws.onerror = () => setIsConnected(false);

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "full") {
            setPlayerState((prev) => ({
              ...prev,
              title: data.title || "",
              duration: data.duration || 0,
              id: data.id || "",
            }));
            setThumbUrl(`https://img.youtube.com/vi/${data.id}/0.jpg`);
          }
          if (data.type === "state") {
            setPlayerState((prev) => ({
              ...prev,
              current: data.current || 0,
              paused: data.paused ?? true,
              volume: data.volume || 0,
            }));
          }
        } catch {}
      };
    };

    connect();
    return () => wsRef.current?.close();
  }, [wsUrl]);

  const sendCommand = (cmd) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(cmd));
    }
  };

  return {
    playerState,
    thumbUrl,
    isConnected,
    isUrlConfigured,
    wsUrl,
    setWsUrl,
    sendCommand,
    showSettings,
    setShowSettings,
  };
}
