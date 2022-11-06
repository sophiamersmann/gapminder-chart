import type { ScaleContinuousNumeric } from 'd3-scale';
import { ReactNode } from 'react';

import { translate } from '../../lib/utils';
import styles from './Axis.module.css';

interface Props {
  yScale: ScaleContinuousNumeric<number, number>;

  ticks?: number[];
  format?: (tick: number) => string;

  tickX?: number; // position of tick label
  tickLength?: number; // length of tick line
}

export default function AxisY({
  yScale,
  ticks,
  tickX = 0,
  tickLength = 6,
  format = (tick) => tick.toString(),
}: Props) {
  if (ticks == undefined) ticks = yScale.ticks();

  return (
    <g className={[styles.axis, styles.axisY].join(' ')}>
      {ticks.map((tick) => (
        <Tick key={tick} x={tickX} y={yScale(tick)} length={tickLength}>
          {format(tick)}
        </Tick>
      ))}
    </g>
  );
}

const Tick = ({
  x,
  y,
  length,
  className = '',
  children,
}: {
  x: number;
  y: number;
  length: number;
  className?: string;
  children: ReactNode;
}) => (
  <g className={[styles.tick, className].join(' ')} transform={translate(0, y)}>
    <line x2={length} className={styles.mute} />
    <text x={x} dy="0.3em">
      {children}
    </text>
  </g>
);
