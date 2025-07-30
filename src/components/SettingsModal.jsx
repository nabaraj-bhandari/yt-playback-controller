import { X } from "lucide-react";
import { useState } from "react";

export default function SettingsModal({ wsUrl, setWsUrl, setShowSettings }) {
  const [tempWsUrl, setTempWsUrl] = useState(wsUrl || "");

  const handleSave = () => {
    setWsUrl(tempWsUrl);
    localStorage.setItem("musicPlayerWsUrl", tempWsUrl);
    setShowSettings(false);
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2a2a2a] rounded-2xl p-4 w-full max-w-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={() => setShowSettings(false)}
            className="p-1 rounded-full hover:bg-gray-600"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            WebSocket URL
          </label>
          <input
            type="text"
            value={tempWsUrl}
            onChange={(e) => setTempWsUrl(e.target.value)}
            className="w-full px-3 py-2 bg-[#1a1a1a] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
            placeholder="ws://192.168.1.100:8080"
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter the WebSocket URL for your music server
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSettings(false)}
            className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 px-4 bg-amber-800 text-white rounded-lg hover:bg-amber-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
