import { ReactNode } from 'react';

import styles from './Annotation.module.css';

interface Props {
  x: number;
  y: number;
  r?: number; // radius of the circle that is annotated (if applicable)
  position?: 'right' | 'top' | 'bottom';
  children: ReactNode;
}

export default function SvgAnnotation({
  x,
  y,
  r = 0,
  position = 'right',
  children,
}: Props) {
  let dx = '0px';
  let dy = '0px';

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
