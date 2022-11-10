import { line as d3line } from 'd3-shape';

import Annotation from '../Annotation/Annotation';
import Circle from '../Scatter/Circle';

import { DataRow } from '../../types';

interface Props {
  data: DataRow[];
  x: (d: DataRow) => number;
  y: (d: DataRow) => number;
  r: (d: DataRow) => number;
  color?: string;
}

export default function HistoryPath({
  data,
  x,
  y,
  r,
  color = 'var(--c-black)',
}: Props) {
  const line = d3line<DataRow>().x(x).y(y);

  const first = data.length > 0 && data[0];
  const last = data.length > 1 && data[data.length - 1];

  return (
    <g>
      {/* line through history */}
      <path
        d={line(data) as string}
        stroke={color}
        strokeWidth="2"
        fill="none"
      />

      {/* first data point */}
      {first && (
        <g>
          <Circle x={x(first)} y={y(first)} r={r(first)} color={color} />
          <Annotation x={x(first)} y={y(first)} r={r(first)} position="bottom">
            <tspan style={{ fontWeight: 'bold' }}>{first.year}</tspan>
          </Annotation>
        </g>
      )}

      {/* last data point */}
      {last && (
        <g>
          <Circle x={x(last)} y={y(last)} r={r(last)} color={color} />
          <Annotation x={x(last)} y={y(last)} r={r(last)}>
            <tspan style={{ fontWeight: 'bold' }}>{last.year}</tspan>{' '}
            {last.country}
          </Annotation>
        </g>
      )}
    </g>
  );
}
