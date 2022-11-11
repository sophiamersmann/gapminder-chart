import { line as d3line } from 'd3-shape';

import Annotation from '../Annotation/Annotation';
import Circle from '../Scatter/Circle';
import Arrow from '../Arrow/Arrow';

import { DataRow } from '../../types';
import { Fragment } from 'react';

interface Props {
  data: DataRow[];
  x: (d: DataRow) => number;
  y: (d: DataRow) => number;
  r: (d: DataRow) => number;
  ticks?: { year: number; label: string }[];
  color?: string;
}

export default function HistoryPath({
  data,
  x,
  y,
  r,
  ticks = [],
  color = 'var(--c-black)',
}: Props) {
  const arrowLength = 24;
  const annotationRadius = 6;
  const padding = 4;

  const line = d3line<DataRow>().x(x).y(y);

  const first = data.length > 0 && data[0];
  const last = data.length > 1 && data[data.length - 1];

  const dataMap = new Map(data.map((d) => [d.year, d]));
  const tickData = ticks.map((tick) => ({
    data: dataMap.get(tick.year),
    label: tick.label,
  }));

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

      {tickData.map(
        ({ data: d, label }) =>
          d && (
            <Fragment key={d.year}>
              <circle
                cx={x(d)}
                cy={y(d)}
                r={annotationRadius}
                stroke="var(--c-black)"
                fill="none"
              />
              <Arrow
                start={[x(d) + annotationRadius + padding, y(d)]}
                end={[x(d) + annotationRadius + padding + arrowLength, y(d)]}
              />
              <Annotation x={x(d)} y={y(d)}>
                <tspan
                  dx={arrowLength + annotationRadius + 2 * padding}
                  fill="var(--c-gray-700)"
                >
                  {label} ({d.year})
                </tspan>
              </Annotation>
            </Fragment>
          )
      )}
    </g>
  );
}
