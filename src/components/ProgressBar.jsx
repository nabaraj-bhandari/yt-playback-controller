import { formatTime, formatRemainingTime } from "../utils/format";

export default function ProgressBar({ current, duration, onChange, onCommit }) {
  const progressPercentage = duration > 0 ? (current / duration) * 100 : 0;

  const sliderStyle = {
    background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${progressPercentage}%, #374151 ${progressPercentage}%, #374151 100%)`,
  };

  return (
    <>
      <input
        type="range"
        min="0"
        max={duration}
        value={current}
        onChange={onChange}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        style={sliderStyle}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-400 mt-1">
        <span>{formatTime(current)}</span>
        <span>{formatRemainingTime(current, duration)}</span>
      </div>
    </>
  );
}
