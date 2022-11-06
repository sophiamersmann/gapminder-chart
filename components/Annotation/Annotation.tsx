import { ReactNode } from 'react';

import styles from './Annotation.module.css';

interface Props {
  x: number;
  y: number;
  r: number;
  position?: 'right' | 'top';
  children: ReactNode;
}

export default function Annotation({
  x,
  y,
  r,
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
  }

  return (
    <text
      className={[styles.annotation, 'text-outline-sm'].join(' ')}
      style={{ textAnchor: position === 'top' ? 'end' : 'start' }}
      x={x}
      y={y}
      dx={dx}
      dy={dy}
    >
      {children}
    </text>
  );
}
