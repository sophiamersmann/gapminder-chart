import { useMemo } from 'react';
import { extent, max, descending, ascending } from 'd3-array';
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
  year?: number;
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
  year,
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
  const margins = { bottom: 20, left: 20, right: 60 };
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

  // if no year given, grab the most recent one
  year = year || max(data, (d) => d.year);

  // filter data for the given year
  const displayData = useMemo(
    () =>
      data
        .filter((d) => d.year === year)
        .sort((a, b) => descending(a.population, b.population)),
    [data, year]
  );

  // get data for each country to highlight
  const highlightedData = useMemo(
    () =>
      displayData
        .filter((d) => highlightedCountries.includes(d.country))
        .sort((a, b) => ascending(a.population, b.population)),
    [displayData, highlightedCountries]
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
            {displayData.map((d) => (
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
            Income per person
          </Label>
          <Label x={-dms.margins.left} y={yScale(maxTickY)} dy="0.3em">
            {tickFormatY(maxTickY)} years
            <tspan x={-dms.margins.left} dy="1.1em">
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
