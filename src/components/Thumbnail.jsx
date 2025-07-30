export default function Thumbnail({ src }) {
  return (
    <img
      src={src}
      alt="Album artwork"
      className="w-full aspect-square rounded-3xl shadow-2xl object-cover"
      onError={(e) =>
        (e.currentTarget.src = "https://placehold.co/400x400?text=No+Image")
      }
    />
  );
}
