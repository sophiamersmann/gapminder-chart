import { round } from '../../lib/utils';
import { DataRow } from '../../types';

interface Props {
  data: DataRow[];
}

export default function HistoryPathDescription({ data }: Props) {
  if (data.length === 0) return null;

  const country = data[0].country;
  const first = data.length >= 2 && data[0];
  const last = data[data.length - 1];

  return (
    <p>
      Health and Wealth of {country}
      {first && ` from ${data[0].year} to ${data[data.length - 1].year}`}.{' '}
      {first && dataPointDescription(first)} {dataPointDescription(last)}
    </p>
  );
}

function dataPointDescription(datum: DataRow) {
  return [
    `In ${datum.year},`,
    `the average life expectancy was ${datum.lifeExpectancy} years`,
    `with an income per person of $${round(datum.gdp)}.`,
  ].join(' ');
}
