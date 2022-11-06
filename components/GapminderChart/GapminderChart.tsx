import { extent, max, descending } from 'd3-array';
import { scaleLinear, scaleLog, scaleSqrt } from 'd3-scale';

import AxisX from '../Axis/AxisX';
import AxisY from '../Axis/AxisY';

import useChartDimensions from '../../lib/hooks/useChartDimensions';
import { px, translate } from '../../lib/utils';
import type { DataRow } from '../../types';

import styles from './GapminderChart.module.css';

interface Props {
  data: DataRow[];
  domainX?: [number, number];
  domainY?: [number, number];
  domainR?: [number, number];
  rangeR?: [number, number];
  minorTicksX?: number[];
  majorTicksX?: number[];
  ticksY?: number[];
}

export default function GapminderChart({
  data,
  domainX,
  domainY,
  domainR,
  rangeR,
  minorTicksX,
  majorTicksX,
  ticksY,
}: Props) {
  // dimensions
  const height = 400;
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
  const mostRecentData = data
    .filter((d) => d.year === mostRecentYear)
    .sort((a, b) => descending(a.population, b.population));

  return (
    <div ref={ref} style={{ height: px(height) }}>
      <svg className={styles.svg} width={dms.width} height={dms.height}>
        <g transform={translate(dms.margins.left, dms.margins.top)}>
          <AxisY
            yScale={yScale}
            label="Life expectancy"
            ticks={ticksY}
            tickX={-dms.margins.left}
            tickLength={dms.boundedWidth}
          />
          <AxisX
            xScale={xScale}
            label="Wealth (GDP per capita)"
            ticks={minorTicksX}
            majorTicks={majorTicksX}
            y={dms.boundedHeight}
            format={(tick) => tick / 1000 + 'k'}
          />

          <g>
            {mostRecentData.map((d) => (
              <circle
                key={d.country}
                cx={xScale(d.gdp)}
                cy={yScale(d.lifeExpectancy)}
                r={rScale(d.population)}
                stroke="orange"
                fill="orange"
                fillOpacity="0.3"
              ></circle>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
