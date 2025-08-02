import { VolumeX, Volume2 } from "lucide-react";

export default function VolumeControl({ volume, onChange, onCommit }) {
  const volumePercentage = Math.min(Math.max(volume, 0), 100);

  const sliderStyle = {
    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${volumePercentage}%, #374151 ${volumePercentage}%, #374151 100%)`,
  };

  return (
    <div className="flex items-center gap-4">
      <VolumeX className="w-5 h-5 text-gray-400" />
      <input
        type="range"
        min="0"
        max="100"
        value={volumePercentage}
        onChange={onChange}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        style={sliderStyle}
        className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
      />
      <Volume2 className="w-5 h-5 text-gray-400" />
    </div>
  );
}
