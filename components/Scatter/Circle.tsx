interface Props {
  x: number;
  y: number;
  r: number; // radius
  color?: string;
}

export default function Circle({ x, y, r, color = 'var(--c-blue)' }: Props) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      stroke="white"
      strokeWidth="0.5"
      fill={color}
      fillOpacity="0.8"
    ></circle>
  );
}
