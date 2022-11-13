import { maxIndex, minIndex } from 'd3-array';

import { round } from '../../lib/utils';
import type { DataRow } from '../../types';

interface Props {
  data: DataRow[];
}

export default function Scatter({ data }: Props) {
  if (data.length === 0) return null;

  const gdpMinIndex = minIndex(data, (d) => d.gdp);
  const gdpMaxIndex = maxIndex(data, (d) => d.gdp);

  const lifeExpectancyMinIndex = minIndex(data, (d) => d.lifeExpectancy);
  const lifeExpectancyMaxIndex = maxIndex(data, (d) => d.lifeExpectancy);

  return (
    <p>
      Health and wealth of {data.length} nations in {data[0].year}. Average life
      expectancy reaches from {data[lifeExpectancyMinIndex].lifeExpectancy}{' '}
      years in {data[lifeExpectancyMinIndex].country} to{' '}
      {data[lifeExpectancyMaxIndex].lifeExpectancy} years in{' '}
      {data[lifeExpectancyMaxIndex].country}. Income per person reaches from $
      {round(data[gdpMinIndex].gdp)} in {data[gdpMinIndex].country} to $
      {round(data[gdpMaxIndex].gdp)} in {data[gdpMaxIndex].country}.
    </p>
  );
}
