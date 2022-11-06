import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { csvParse } from 'd3-dsv';
import { max } from 'd3-array';

import GapminderChart from '../components/GapminderChart/GapminderChart';

import { readFileSync } from '../lib/server';
import type { DataRow } from '../types';

export const getStaticProps: GetStaticProps = async (_context) => {
  // read data upfront (at build time)
  const data = csvParse<
    DataRow,
    'country' | 'year' | 'gdp_per_capita' | 'life_expectancy' | 'population'
  >(readFileSync('data/data-by-country-and-year.csv'), (d) => ({
    country: d.country as string,
    year: +(d.year as string),
    gdp: +(d.gdp_per_capita as string),
    lifeExpectancy: +(d.life_expectancy as string),
    population: +(d.population as string),
  }));

  return {
    props: {
      data: data,
    },
  };
};

interface IndexProps {
  data: DataRow[];
}

const IndexPage: NextPage<IndexProps> = ({ data }: IndexProps) => {
  return (
    <div>
      <Head>
        <title>Gapminder Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <hgroup>
          <h1>Heading</h1>
          <p>Subtitle</p>
        </hgroup>

        <GapminderChart
          data={data}
          domainX={[500, 200000]}
          domainY={[10, max(data, (d) => d.lifeExpectancy) as number]}
          rangeR={[4, 40]}
          minorTicksX={[
            1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000,
            30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
          ]}
          majorTicksX={[1000, 10000, 100000]}
          ticksY={[20, 30, 40, 50, 60, 70, 80, 90]}
        />
      </main>
    </div>
  );
};

export default IndexPage;
