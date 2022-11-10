import { useMemo } from 'react';
import { ascending } from 'd3-array';
import type { ScaleContinuousNumeric } from 'd3-scale';

import Annotation from '../Annotation/Annotation';
import Circle from './Circle';

import type { DataRow } from '../../types';

interface Props {
  data: DataRow[];
  annotatedCountries?: string[];
  xScale: ScaleContinuousNumeric<number, number>;
  yScale: ScaleContinuousNumeric<number, number>;
  rScale: ScaleContinuousNumeric<number, number>;
  color?: (d: DataRow) => string;
}

export default function Scatter({
  data,
  annotatedCountries = [],
  xScale,
  yScale,
  rScale,
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
            x={xScale(d.gdp)}
            y={yScale(d.lifeExpectancy)}
            r={rScale(d.population)}
            color={color(d)}
          />
        ))}
      </g>

      {/* annotate given countries */}
      {annotations.map((d) => (
        <Annotation
          key={d.country}
          x={xScale(d.gdp)}
          y={yScale(d.lifeExpectancy)}
          r={rScale(d.population)}
          position={
            d.country === 'China' || d.country === 'India' ? 'top' : 'right'
          }
        >
          {d.country}
        </Annotation>
      ))}
    </g>
  );
}
