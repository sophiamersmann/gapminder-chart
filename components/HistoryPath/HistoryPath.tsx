import { Fragment } from 'react';
import { line as d3line } from 'd3-shape';

import SvgAnnotation from '../Annotation/SvgAnnotation';
import Circle from '../Scatter/Circle';
import Arrow from '../Arrow/Arrow';

import { DataRow } from '../../types';

interface Props {
  data: DataRow[];
  xGet: (d: DataRow) => number;
  yGet: (d: DataRow) => number;
  rGet: (d: DataRow) => number;
  ticks?: DataRow[];
  color?: string;
  config?: { arrowLength: number; annotationRadius: number; padding: number };
}

export default function HistoryPath({
  data,
  xGet,
  yGet,
  rGet,
  ticks = [],
  color = 'var(--c-black)',
  config,
}: Props) {
  // set default configuration if not given
  const cfg = {
    arrowLength: 24,
    annotationRadius: 6,
    padding: 4,
    ...config,
  };

  const line = d3line<DataRow>().x(xGet).y(yGet);

  // only show the first data point if there are at least two points
  const first = data.length >= 2 && data[0];
  const last = data.length > 0 && data[data.length - 1];

  return (
    <g>
      {/* line through history */}
      <path
        d={line(data) as string}
        stroke={color}
        strokeWidth="2"
        fill="none"
      />

      {/* first data point (and annotation) */}
      {first && (
        <g>
          <Circle
            x={xGet(first)}
            y={yGet(first)}
            r={rGet(first)}
            color={color}
          />
          <SvgAnnotation
            x={xGet(first)}
            y={yGet(first)}
            r={rGet(first)}
            position="bottom"
          >
            <tspan style={{ fontWeight: 'bold' }}>{first.year}</tspan>
          </SvgAnnotation>
        </g>
      )}

      {/* last data point */}
      {last && (
        <Circle x={xGet(last)} y={yGet(last)} r={rGet(last)} color={color} />
      )}

      {/* ticks (indicator and arrow) */}
      {ticks.map((d) => (
        <Fragment key={d.year}>
          <circle
            cx={xGet(d)}
            cy={yGet(d)}
            r={cfg.annotationRadius}
            stroke="var(--c-black)"
            fill="none"
          />
          <Arrow
            start={[xGet(d) + cfg.annotationRadius + cfg.padding, yGet(d)]}
            end={[
              xGet(d) + cfg.annotationRadius + cfg.padding + cfg.arrowLength,
              yGet(d),
            ]}
          />
        </Fragment>
      ))}
    </g>
  );
}
