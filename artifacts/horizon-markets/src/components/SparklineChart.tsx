export function SparklineChart({
  data,
  color,
  width = "100%",
  height = 64,
}: {
  data: number[];
  color: string;
  width?: string | number;
  height?: number;
}) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Normalize to SVG coordinates [4, height-4]
  const padding = 4;
  const innerHeight = height - padding * 2;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100; // use % for flexible width
    const y = padding + innerHeight - ((val - min) / range) * innerHeight;
    return `${x},${y}`;
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 100 ${height}`}
      preserveAspectRatio="none"
      className="overflow-visible"
    >
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
