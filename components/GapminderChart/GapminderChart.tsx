import { useMemo } from 'react';
import { extent, max, descending, ascending } from 'd3-array';
import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

import AxisX from '../Axis/AxisX';
import AxisY from '../Axis/AxisY';
import Label from '../Axis/Label';
import Scatter from '../Scatter/Scatter';
import HistoryPath from '../HistoryPath/HistoryPath';

import useChartDimensions from '../../lib/hooks/useChartDimensions';
import { translate } from '../../lib/utils';
import type { DataRow } from '../../types';

import styles from './GapminderChart.module.css';

interface Props {
  data: DataRow[];
  year?: number;
  annotatedCountries?: string[];
  highlightedCountry?: string;
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
  annotatedCountries = [],
  highlightedCountry,
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

  // get history data for the country to highlight
  const historyData = useMemo(() => {
    if (!highlightedCountry) return;
    return data
      .filter((d) => d.country === highlightedCountry)
      .sort((a, b) => ascending(a.year, b.year));
  }, [data, highlightedCountry]);

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

          {/* if a country to highlight is specified, shoe its history. Else, render a scatter plot of all countries */}
          {highlightedCountry && historyData ? (
            <HistoryPath
              data={historyData}
              x={(d: DataRow) => xScale(d.gdp)}
              y={(d: DataRow) => yScale(d.lifeExpectancy)}
              r={(d: DataRow) => rScale(d.population)}
              color={color(historyData[0])}
            />
          ) : (
            <Scatter
              data={displayData}
              xScale={xScale}
              yScale={yScale}
              rScale={rScale}
              color={color}
              annotatedCountries={annotatedCountries}
            />
          )}

          {/* axis labels, rendered last to make sure they're are on top of the shapes */}
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
        </g>
      </svg>
    </div>
  );
}
