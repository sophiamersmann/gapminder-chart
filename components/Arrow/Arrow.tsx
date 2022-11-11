interface Props {
  start: [number, number];
  end: [number, number];
  arrowHeadLength?: number;
  arrowHeadRotation?: number;
  color?: string;
}

export default function Arrow({
  start,
  end,
  arrowHeadLength = 6,
  arrowHeadRotation = 45,
  color = 'var(--c-black)',
}: Props) {
  return (
    <path
      d={constructArrowPath(start, end, { arrowHeadLength, arrowHeadRotation })}
      stroke={color}
      fill="none"
    />
  );
}

function constructArrowPath(
  start: [number, number],
  end: [number, number],
  { arrowHeadLength = 6, arrowHeadRotation = 45 }
) {
  let d = ['M', start, 'L', end].join(' ');

  d += constructArrowHeadPath(start, end, {
    length: arrowHeadLength,
    theta: arrowHeadRotation,
  });

  return d;
}

function constructArrowHeadPath(
  point: [number, number],
  handle: [number, number],
  { length = 6, theta = 45 } = {}
) {
  const xLen = handle[0] - point[0];
  const yLen = handle[1] - point[1];

  const distance = Math.sqrt(Math.pow(xLen, 2) + Math.pow(yLen, 2));
  const ratio = length / distance;

  const mid: [number, number] = [
    point[0] + xLen * ratio,
    point[1] + yLen * ratio,
  ];

  function rotate(p: [number, number], pivot: [number, number], theta = 45) {
    const thetaRad = (theta * Math.PI) / 180;
    return [
      pivot[0] +
        (p[0] - pivot[0]) * Math.cos(thetaRad) -
        (p[1] - pivot[1]) * Math.sin(thetaRad),
      pivot[1] +
        (p[0] - pivot[0]) * Math.sin(thetaRad) +
        (p[1] - pivot[1]) * Math.cos(thetaRad),
    ];
  }

  return [
    'M',
    rotate(mid, point, theta),
    'L',
    point,
    'L',
    rotate(mid, point, -theta),
  ].join(' ');
}
