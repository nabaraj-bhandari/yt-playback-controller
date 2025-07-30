import { formatTime, formatRemainingTime } from "../utils/format";

export default function ProgressBar({ current, duration, onChange, onCommit }) {
  const progressPercentage = duration > 0 ? (current / duration) * 100 : 0;
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
        className="w-full h-1 bg-gray-700 rounded-full appearance-none accent-amber-500"
      />
      <div className="flex justify-between text-sm text-gray-400 mt-1">
        <span>{formatTime(current)}</span>
        <span>{formatRemainingTime(current, duration)}</span>
      </div>
    </>
  );
}
