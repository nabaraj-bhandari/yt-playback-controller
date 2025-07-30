export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatRemainingTime(current, duration) {
  const remaining = duration - current;
  return `-${formatTime(remaining)}`;
}
