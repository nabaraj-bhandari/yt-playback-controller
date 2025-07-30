import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
} from "lucide-react";

export default function Controls({
  onPrevious,
  onRewind,
  onPlayPause,
  paused,
  onForward,
  onNext,
}) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onPrevious}
        className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center active:bg-green-600"
      >
        <SkipBack className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={onRewind}
        className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center active:bg-green-600"
      >
        <RotateCcw className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={onPlayPause}
        className="w-20 h-20 rounded-full bg-amber-800 flex items-center justify-center active:bg-amber-700"
      >
        {paused ? (
          <Play className="w-9 h-9 text-white ml-1" />
        ) : (
          <Pause className="w-9 h-9 text-white" />
        )}
      </button>
      <button
        onClick={onForward}
        className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center active:bg-green-600"
      >
        <RotateCw className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={onNext}
        className="w-14 h-14 rounded-full bg-green-700 flex items-center justify-center active:bg-green-600"
      >
        <SkipForward className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
