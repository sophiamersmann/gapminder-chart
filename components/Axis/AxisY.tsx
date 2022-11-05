import type { ScaleContinuousNumeric } from 'd3-scale';
import { ReactNode } from 'react';

import { translate } from '../../lib/utils';
import styles from './Axis.module.css';

interface Props {
  yScale: ScaleContinuousNumeric<number, number>;
  label: ReactNode;

  ticks?: number[];
  format?: (tick: number) => string;

  tickX?: number; // position of tick label
  tickLength?: number; // length of tick line
}

export default function AxisY({
  yScale,
  ticks,
  label,
  tickX = 0,
  tickLength = 6,
  format = (tick) => tick.toString(),
}: Props) {
  if (ticks == undefined) ticks = yScale.ticks();
  const lastTick = ticks.length > 0 && ticks[ticks.length - 1];

  return (
    <g className={[styles.axis, styles.axisY].join(' ')}>
      {/* all but the last tick */}
      {ticks.slice(0, -1).map((tick) => (
        <Tick key={tick} x={tickX} y={yScale(tick)} length={tickLength}>
          {format(tick)}
        </Tick>
      ))}

      {/* the last tick serves as label */}
      {lastTick && (
        <>
          <Tick
            className={[styles.label, 'text-outline'].join(' ')}
            x={tickX}
            y={yScale(lastTick)}
            length={tickLength}
          >
            {format(lastTick)} years
            <tspan x={tickX} dy="1.15em">
              {label}
            </tspan>
          </Tick>
        </>
      )}
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
