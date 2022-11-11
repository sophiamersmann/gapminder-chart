import { ReactNode } from 'react';

import styles from './Axis.module.css';

interface Props {
  x?: number;
  y?: number;
  dx?: number | string;
  dy?: number | string;
  xAlign?: 'left' | 'center' | 'right';
  children: ReactNode;
}

export default function Label({
  x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  xAlign = 'left',
  children,
}: Props) {
  return (
    <text
      className={[styles.label, styles[xAlign], 'text-outline'].join(' ')}
      x={x}
      y={y}
      dx={dx}
      dy={dy}
    >
      {children}
    </text>
  );
}
