import { ReactNode } from 'react';

import styles from './Legend.module.css';

interface Props {
  children: ReactNode;
}

export default function Legend({ children }: Props) {
  return <div className={styles.legend}>{children}</div>;
}
