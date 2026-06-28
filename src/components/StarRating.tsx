export default function StarRating({
  value,
  size = "text-sm",
}: {
  value: number;
  size?: string;
}) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className={`inline-flex items-center gap-0.5 text-gold ${size}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={`ti ${
            i < full ? "ti-star-filled" : i === full && half ? "ti-star-half-filled" : "ti-star"
          }`}
          aria-hidden
        />
      ))}
    </span>
  );
}
