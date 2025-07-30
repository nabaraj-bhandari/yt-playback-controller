import { VolumeX, Volume2 } from "lucide-react";

export default function VolumeControl({ volume, onChange, onCommit }) {
  return (
    <div className="flex items-center gap-4">
      <VolumeX className="w-5 h-5 text-gray-400" />
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={onChange}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        className="flex-1 h-1 bg-gray-700 rounded-full accent-amber-500"
      />
      <Volume2 className="w-5 h-5 text-gray-400" />
    </div>
  );
}
