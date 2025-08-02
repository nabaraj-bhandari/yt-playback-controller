export default function Thumbnail({ src }) {
  return (
    <img
      src={src}
      alt="Album artwork"
      className="w-full aspect-video rounded-md shadow-xl object-cover"
      onError={(e) =>
        (e.currentTarget.src = "https://placehold.co/400x400?text=YouTube")
      }
    />
  );
}
