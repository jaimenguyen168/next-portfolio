interface Props {
  slug: string | null;
  color?: string;
  size?: number;
  label: string;
  className?: string;
}

export default function SimpleIcon({ slug, color, size = 16, label, className }: Props) {
  if (!slug) {
    const dotSize = Math.max(6, Math.round(size * 0.45));
    return (
      <span
        aria-label={label}
        className={className}
        style={{
          display: "inline-block",
          width: dotSize,
          height: dotSize,
          borderRadius: "50%",
          backgroundColor: color ?? "#888",
          flexShrink: 0,
        }}
      />
    );
  }

  const hex = color?.replace("#", "");
  const src = hex
    ? `https://cdn.simpleicons.org/${slug}/${hex}`
    : `https://cdn.simpleicons.org/${slug}`;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt={label}
      className={className}
      style={{ width: size, height: size, flexShrink: 0 }}
      onError={(e) => {
        (e.target as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
