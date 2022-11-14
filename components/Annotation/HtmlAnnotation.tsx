import { ReactNode } from 'react';
import { px, translate } from '../../lib/utils';
import type { Dimensions } from '../../types';

import styles from './Annotation.module.css';

interface Props {
  dimensions: Dimensions;
  x: number;
  y: number;
  r?: number; // radius of the circle that is annotated (if applicable)
  position?: 'right';
  children: ReactNode;
}

export default function HtmlAnnotation({
  dimensions,
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
    dy = `calc(-50% + ${dy})`;
  }

  return (
    <div
      className={[styles.annotation, 'text-outline-sm'].join(' ')}
      style={{
        left: px(x),
        top: px(y),
        transform: translate(dx, dy),
        width: px(dimensions.boundedWidth - x + dimensions.margins.right),
      }}
    >
      {children}
    </div>
  );
}
