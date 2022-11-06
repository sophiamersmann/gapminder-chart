import { useMemo } from 'react';
import { extent, max, descending } from 'd3-array';
import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

import AxisX from '../Axis/AxisX';
import AxisY from '../Axis/AxisY';
import Label from '../Axis/Label';
import Annotation from '../Annotation/Annotation';

import useChartDimensions from '../../lib/hooks/useChartDimensions';
import { translate } from '../../lib/utils';
import type { DataRow } from '../../types';

import styles from './GapminderChart.module.css';

interface Props {
  data: DataRow[];
  highlightedCountries?: string[];
  domainX?: [number, number];
  domainY?: [number, number];
  domainR?: [number, number];
  rangeR?: [number, number];
  minorTicksX?: number[];
  majorTicksX?: number[];
  ticksY?: number[];
  color?: (d: DataRow) => string;
}

export default function GapminderChart({
  data,
  highlightedCountries = [],
  domainX,
  domainY,
  domainR,
  rangeR,
  minorTicksX,
  majorTicksX,
  ticksY,
  color = () => 'var(--c-blue)',
}: Props) {
  // dimensions
  const margins = { bottom: 20, left: 20 };
  const { ref, dimensions: dms } = useChartDimensions<HTMLDivElement>(margins);

  // scales
  const xScale = scaleLog()
    .domain(domainX || (extent(data, (d) => d.gdp) as [number, number]))
    .range([0, dms.boundedWidth]);
  const yScale = scaleLinear()
    .domain(
      domainY || (extent(data, (d) => d.lifeExpectancy) as [number, number])
    )
    .range([dms.boundedHeight, 0])
    .nice();
  const rScale = scaleSqrt()
    .domain(domainR || (extent(data, (d) => d.population) as [number, number]))
    .range(rangeR || [2, 10]);

  // data
  const mostRecentYear = max(data, (d) => d.year);
  const mostRecentData = useMemo(
    () =>
      data
        .filter((d) => d.year === mostRecentYear)
        .sort((a, b) => descending(a.population, b.population)),
    [data, mostRecentYear]
  );
  const highlightedData = useMemo(
    () =>
      mostRecentData.filter((d) => highlightedCountries.includes(d.country)),
    [mostRecentData, highlightedCountries]
  );

  // ticks
  ticksY = ticksY || yScale.ticks();
  const maxTickY = ticksY[ticksY.length - 1];
  const tickFormatY = (tick: number) => tick.toString();

  return (
    <div ref={ref}>
      <svg className={styles.svg} width={dms.width} height={dms.height}>
        <g transform={translate(dms.margins.left, dms.margins.top)}>
          <AxisY
            yScale={yScale}
            ticks={ticksY}
            tickX={-dms.margins.left}
            tickLength={dms.boundedWidth}
            format={tickFormatY}
          />
          <AxisX
            xScale={xScale}
            ticks={minorTicksX}
            majorTicks={majorTicksX}
            y={dms.boundedHeight}
            format={(tick) => '$' + tick / 1000 + 'k'}
          />

          <g>
            {mostRecentData.map((d) => (
              <circle
                key={d.country}
                cx={xScale(d.gdp)}
                cy={yScale(d.lifeExpectancy)}
                r={rScale(d.population)}
                stroke="white"
                strokeWidth="0.5"
                fill={color(d)}
                fillOpacity="0.8"
              ></circle>
            ))}
          </g>

          {/* rendered last to make sure they're are on top of the shapes */}
          <Label
            x={dms.boundedWidth}
            y={dms.boundedHeight}
            dy="-8"
            xAlign="right"
          >
            Income per person (GDP per capita)
          </Label>
          <Label x={-dms.margins.left} y={yScale(maxTickY)} dy="0.3em">
            {tickFormatY(maxTickY)} years
            <tspan x={-dms.margins.left} dy="1.15em">
              Life expectancy
            </tspan>
          </Label>

          {/* annotate given countries */}
          {highlightedData.map((d) => (
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
      </svg>
    </div>
  );
}
