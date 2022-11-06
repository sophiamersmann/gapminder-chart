import Head from 'next/head';
import { GetStaticProps, NextPage } from 'next';
import { csvParse } from 'd3-dsv';
import { max } from 'd3-array';
import { scaleOrdinal } from 'd3-scale';

import GapminderChart from '../components/GapminderChart/GapminderChart';
import Legend from '../components/Legend/Legend';
import LegendItem from '../components/Legend/LegendItem';

import { readFileSync } from '../lib/server';
import type { DataRow } from '../types';

// read data upfront (at build time)
export const getStaticProps: GetStaticProps = async (_context) => {
  // GDP, life expectance and population by country and year
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

  // continents by country
  const continents = csvParse<'country' | 'continent'>(
    readFileSync('data/continent-by-country.csv')
  );

  return {
    props: {
      data: data,
      continents: continents,
    },
  };
};

interface IndexProps {
  data: DataRow[];
  continents: { country: string; continent: string }[];
}

const IndexPage: NextPage<IndexProps> = ({ data, continents }: IndexProps) => {
  // quick access to a country's continent
  const continentMap = new Map(continents.map((d) => [d.country, d.continent]));

  // hand-pick continent colors (and their order)
  const continentColors = [
    { continent: 'Africa', color: 'var(--c-purple)' },
    { continent: 'Asia', color: 'var(--c-red)' },
    { continent: 'Oceania', color: 'var(--c-yellow)' },
    { continent: 'North America', color: 'var(--c-turquoise)' },
    { continent: 'South America', color: 'var(--c-green)' },
    { continent: 'Europe', color: 'var(--c-blue)' },
    { continent: 'Antarctica', color: 'var(--c-beige)' },
  ];

  const uniqueContinents = continentColors.map((d) => d.continent);
  const color = scaleOrdinal<string, string>()
    .domain(uniqueContinents)
    .range(continentColors.map((d) => d.color))
    .unknown('var(--c-black)');

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

        <Legend>
          {uniqueContinents.map((continent) => (
            <LegendItem key={continent} color={color(continent)}>
              {continent}
            </LegendItem>
          ))}
        </Legend>

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
          color={(d: DataRow) => color(continentMap.get(d.country) as string)}
        />
      </main>
    </div>
  );
};

export default IndexPage;
