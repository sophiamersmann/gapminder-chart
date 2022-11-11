// adapted from https://wattenberger.com/blog/react-and-d3#sizing-responsivity

import { useState, useRef, useEffect } from 'react';

interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const useChartDimensions = <E extends HTMLElement>(
  passedMargins: Partial<Margins> = {},
  { ratio = 16 / 9, minHeight = 300, maxHeight = 400 } = {}
) => {
  const ref = useRef<E>(null);

  // set default margins
  const margins = {
    top: passedMargins.top || 0,
    right: passedMargins.right || 0,
    bottom: passedMargins.bottom || 0,
    left: passedMargins.left || 0,
  };

  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = ref.current as E;

    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        if (!Array.isArray(entries)) return;
        if (entries.length === 0) return;

        const entry = entries[0];
        setWidth(entry.contentRect.width);
      }
    );

    resizeObserver.observe(element);

    return () => resizeObserver.unobserve(element);
  }, []);

  // maintain given ratio between width and height (within bounds)
  const height = Math.min(Math.max((1 / ratio) * width, minHeight), maxHeight);

  const dimensions = {
    margins,
    width,
    height,
    boundedHeight: Math.max(height - margins.top - margins.bottom, 0),
    boundedWidth: Math.max(width - margins.left - margins.right, 0),
  };

  return { ref, dimensions };
};

export default useChartDimensions;