import { ReactNode } from 'react';

import styles from './Annotation.module.css';

interface Props {
  x: number;
  y: number;
  r?: number;
  position?: 'right' | 'top' | 'bottom';
  children: ReactNode;
}

export default function Annotation({
  x,
  y,
  r = 0,
  position = 'right',
  children,
}: Props) {
  let dx = '0';
  let dy = '0';

  if (position === 'right') {
    x += r;
    dx = '2px';
    dy = '0.35em';
  } else if (position === 'top') {
    y -= r;
    dx = '-10px';
  } else if (position === 'bottom') {
    y += r;
    dy = '1em';
  }

  const textAnchor = {
    top: 'end',
    right: 'start',
    bottom: 'middle',
  } as const;

  return (
    <text
      className={[styles.annotation, 'text-outline-sm'].join(' ')}
      style={{ textAnchor: textAnchor[position] }}
      x={x}
      y={y}
      dx={dx}
      dy={dy}
    >
      {children}
    </text>
  );
}
