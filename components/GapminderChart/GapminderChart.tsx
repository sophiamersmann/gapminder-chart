import { useMemo } from 'react';
import { extent, max, descending, ascending } from 'd3-array';
import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

import AxisX from '../Axis/AxisX';
import AxisY from '../Axis/AxisY';
import AxisLabel from '../Axis/AxisLabel';
import Scatter from '../Scatter/Scatter';
import ScatterDescription from '../Scatter/ScatterDescription';
import HistoryPath from '../HistoryPath/HistoryPath';
import HistoryPathDescription from '../HistoryPath/HistoryPathDescription';
import HtmlAnnotation from '../Annotation/HtmlAnnotation';

import useChartDimensions from '../../lib/hooks/useChartDimensions';
import { px, translate } from '../../lib/utils';
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
  ticksZ?: number[];
  tickFormatX?: (v: number) => string;
  tickFormatY?: (v: number) => string;
  tickFormatZ?: (v: number) => string;
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
  rangeR = [2, 10],
  minorTicksX,
  majorTicksX,
  ticksY,
  ticksZ = [],
  tickFormatX = (v) => v.toString(),
  tickFormatY = (v) => v.toString(),
  tickFormatZ = (v) => v.toString(),
  color = () => 'var(--c-blue)',
}: Props) {
  // internal configurations
  const cfg = {
    ticksZ: {
      arrowLength: 24,
      annotationRadius: 6,
      padding: 4,
    },
  };

  // dimensions
  const margins = { bottom: 20, left: 20, right: 60 };
  const { ref, dimensions: dms } = useChartDimensions<HTMLDivElement>(margins);

  // if no year given, grab the most recent one
  year = year || max(data, (d) => d.year);

  // infer domains from data if necessary
  domainX = domainX || (extent(data, (d) => d.gdp) as [number, number]);
  domainY =
    domainY || (extent(data, (d) => d.lifeExpectancy) as [number, number]);
  domainR = domainR || (extent(data, (d) => d.population) as [number, number]);

  // scales
  const xScale = scaleLog().domain(domainX).range([0, dms.boundedWidth]);
  const yScale = scaleLinear()
    .domain(domainY)
    .range([dms.boundedHeight, 0])
    .nice();
  const rScale = scaleSqrt().domain(domainR).range(rangeR);

  // shortcuts
  const xGet = (d: DataRow) => xScale(d.gdp);
  const yGet = (d: DataRow) => yScale(d.lifeExpectancy);
  const rGet = (d: DataRow) => rScale(d.population);

  // filter data for the given year
  const displayData = useMemo(
    () =>
      data
        .filter((d) => d.year === year)
        .sort((a, b) => descending(a.population, b.population)),
    [data, year]
  );

  // get history data for the country to highlight (if given)
  const historyData = useMemo(() => {
    if (!highlightedCountry) return;
    return data
      .filter((d) => d.country === highlightedCountry)
      .sort((a, b) => ascending(a.year, b.year));
  }, [data, highlightedCountry]);
  const showHistory = historyData && historyData.length >= 1;

  // y-ticks
  ticksY = ticksY || yScale.ticks();
  const maxTickY = ticksY[ticksY.length - 1];

  // z-ticks
  let tickDataZ: DataRow[] = [];
  if (showHistory) {
    const dataMap = new Map(historyData.map((d) => [d.year, d]));
    for (let i = 0; i < ticksZ.length; i++) {
      const year = ticksZ[i];
      if (dataMap.has(year)) {
        tickDataZ.push(dataMap.get(year) as DataRow);
      }
    }
  }

  return (
    <>
      <div className="visually-hidden">
        <hgroup>
          <h2>Scatter plot: Health and Wealth of Nations</h2>
          <p>Average life expectancy plotted against income per person</p>
        </hgroup>
        {showHistory ? (
          <HistoryPathDescription data={historyData} />
        ) : (
          <ScatterDescription data={displayData} />
        )}
      </div>
      <div className={styles.chart} ref={ref} aria-hidden="true">
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
              format={tickFormatX}
            />

            {/* if a country is selected, show its history */}
            {showHistory ? (
              <HistoryPath
                data={historyData}
                xGet={xGet}
                yGet={yGet}
                rGet={rGet}
                color={color(historyData[0])}
                ticks={tickDataZ}
                config={cfg.ticksZ}
              />
            ) : (
              // else, show a scatter plot with all countries for a given year
              <Scatter
                data={displayData}
                xGet={xGet}
                yGet={yGet}
                rGet={rGet}
                color={color}
                annotatedCountries={annotatedCountries}
              />
            )}

            {/* axis labels are rendered last to make sure they're are on top of the shapes */}
            <AxisLabel
              x={dms.boundedWidth}
              y={dms.boundedHeight}
              dy="-8"
              xAlign="right"
            >
              Income per person
            </AxisLabel>
            <AxisLabel x={-dms.margins.left} y={yScale(maxTickY)} dy="0.3em">
              {tickFormatY(maxTickY)} years
              <tspan x={-dms.margins.left} dy="1.1em">
                Life expectancy
              </tspan>
            </AxisLabel>
          </g>
        </svg>
        {/* html canvas with the same coordinate system as the svg */}
        {/* multi-line labels are rendered here, so that we get line breaks for free */}
        <div
          className={styles.htmlCanvas}
          style={{
            width: px(dms.boundedWidth),
            height: px(dms.boundedHeight),
            top: px(dms.margins.top),
            left: px(dms.margins.left),
          }}
        >
          {/* label of the most recent data point when showing history data */}
          {showHistory && (
            <HtmlAnnotation
              dimensions={dms}
              x={xGet(historyData[historyData.length - 1])}
              y={yGet(historyData[historyData.length - 1])}
              r={rGet(historyData[historyData.length - 1])}
            >
              <b>{historyData[historyData.length - 1].year}</b>{' '}
              {historyData[historyData.length - 1].country}
            </HtmlAnnotation>
          )}

          {/* ticks labels along the history path */}
          {tickDataZ.map((d) => (
            <HtmlAnnotation
              key={d.year}
              dimensions={dms}
              x={
                xGet(d) +
                cfg.ticksZ.arrowLength +
                cfg.ticksZ.annotationRadius +
                2 * cfg.ticksZ.padding
              }
              y={yGet(d)}
            >
              <span className={styles.tickZ}>{tickFormatZ(d.year)}</span>
            </HtmlAnnotation>
          ))}
        </div>
      </div>
    </>
  );
}
