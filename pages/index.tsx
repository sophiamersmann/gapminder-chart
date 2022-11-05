import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';

import { csvParse } from 'd3-dsv';

import { readFileSync } from '../lib/utils';
import type { DataRow } from '../types/data';

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

      <main>Hello world!</main>
    </div>
  );
};

export default IndexPage;
