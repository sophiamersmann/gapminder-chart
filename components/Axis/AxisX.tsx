import type { ScaleContinuousNumeric } from 'd3-scale';
import { ReactNode } from 'react';

import { translate } from '../../lib/utils';
import styles from './Axis.module.css';

interface Props {
  xScale: ScaleContinuousNumeric<number, number>;

  ticks?: number[]; // list of ticks that are marked by a line
  majorTicks?: number[]; // list of ticks that get a label

  y?: number; // y-position of the axis
  format?: (tick: number) => string;
  tickLength?: number; // length of the tick line
}

export default function AxisX({
  xScale,
  ticks,
  majorTicks,
  y = 0,
  format = (tick) => tick.toString(),
  tickLength = 6,
}: Props) {
  if (ticks == undefined) ticks = xScale.ticks();
  if (majorTicks == undefined) majorTicks = ticks;

  const range = xScale.range();

  return (
    <g
      className={[styles.axis, styles.axisX].join(' ')}
      transform={translate(0, y)}
    >
      {/* bottom line */}
      <line className={styles.connector} x1={range[0]} x2={range[1]} />

      {/* minor ticks */}
      {ticks.map((tick) => (
        <Tick key={tick} x={xScale(tick)} length={tickLength} />
      ))}

      {/* major ticks */}
      {majorTicks.map((tick) => (
        <Tick
          key={tick}
          x={xScale(tick)}
          length={tickLength}
          renderLine={!ticks?.includes(tick)}
        >
          <text dy="1em" transform={translate(0, tickLength)}>
            {format(tick)}
          </text>
        </Tick>
      ))}
    </g>
  );
}

const Tick = ({
  x,
  length,
  renderLine = true,
  children,
}: {
  x: number;
  length: number;
  renderLine?: boolean;
  children?: ReactNode;
}) => (
  <g className={styles.tick} transform={translate(x, 0)}>
    {renderLine && <line y2={length} />}
    {children}
  </g>
);
