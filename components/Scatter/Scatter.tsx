import { useMemo } from 'react';
import { ascending } from 'd3-array';

import SvgAnnotation from '../Annotation/SvgAnnotation';
import Circle from './Circle';

import type { DataRow } from '../../types';

interface Props {
  data: DataRow[];
  annotatedCountries?: string[];
  xGet: (d: DataRow) => number;
  yGet: (d: DataRow) => number;
  rGet: (d: DataRow) => number;
  color?: (d: DataRow) => string;
}

export default function Scatter({
  data,
  annotatedCountries = [],
  xGet,
  yGet,
  rGet,
  color = () => 'var(--c-blue)',
}: Props) {
  // get data for annotations
  const annotations = useMemo(
    () =>
      data
        .filter((d) => annotatedCountries.includes(d.country))
        .sort((a, b) => ascending(a.population, b.population)),
    [data, annotatedCountries]
  );

  return (
    <g>
      <g>
        {data.map((d) => (
          <Circle
            key={d.country}
            x={xGet(d)}
            y={yGet(d)}
            r={rGet(d)}
            color={color(d)}
          />
        ))}
      </g>

      {/* annotate given countries */}
      {annotations.map((d) => (
        <SvgAnnotation
          key={d.country}
          x={xGet(d)}
          y={yGet(d)}
          r={rGet(d)}
          position={
            d.country === 'China' || d.country === 'India' ? 'top' : 'right'
          }
        >
          {d.country}
        </SvgAnnotation>
      ))}
    </g>
  );
}
