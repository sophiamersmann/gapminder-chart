import { ReactNode } from 'react';

import styles from './Legend.module.css';

interface Props {
  color: string;
  children: ReactNode;
}

export default function LegendItem({ color, children }: Props) {
  return (
    <li className={styles.item}>
      <span className={styles.shape} style={{ backgroundColor: color }}></span>{' '}
      {children}
    </li>
  );
}
