import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';
import { useState } from 'react';

import { csvParse } from 'd3-dsv';
import { max } from 'd3-array';
import { scaleOrdinal } from 'd3-scale';

import GapminderChart from '../components/GapminderChart/GapminderChart';
import GroupedSelect from '../components/GroupedSelect/GroupedSelect';
import Legend from '../components/Legend/Legend';
import LegendItem from '../components/Legend/LegendItem';

import { readFileSync } from '../lib/server';
import * as colors from '../styles/colors';
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
  const [selectedCountry, setSelectedCountry] = useState<string>();

  // quick access to a country's continent
  const continentMap = new Map(continents.map((d) => [d.country, d.continent]));

  // hand-pick continent colors (and their order)
  const continentColors = [
    { continent: 'Africa', color: colors.cPurple },
    { continent: 'Asia', color: colors.cRed },
    { continent: 'Oceania', color: colors.cYellow },
    { continent: 'North America', color: colors.cTurquoise },
    { continent: 'South America', color: colors.cGreen },
    { continent: 'Europe', color: colors.cBlue },
    { continent: 'Antarctica', color: colors.cBeige },
  ];

  // color scale
  const uniqueContinents = continentColors.map((d) => d.continent);
  const continentColor = scaleOrdinal<string, string>()
    .domain(uniqueContinents)
    .range(continentColors.map((d) => d.color))
    .unknown(colors.cBlack);

  return (
    <div>
      <Head>
        <title>Gapminder Chart</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 style={{ marginBottom: 'var(--s-rem-4)' }}>
          Health and Wealth of Nations — from then to now
        </h1>

        <div style={{ marginBottom: 'var(--s-rem-7)' }}>
          <GroupedSelect
            id="select-country"
            label={
              <>
                Explore how a country&apos;s health and wealth has{' '}
                <b>changed over time:</b>
              </>
            }
            placeholder="Select a country..."
            values={[...new Set(data.map((d) => d.country))]}
            selectedValue={selectedCountry}
            setSelectedValue={setSelectedCountry}
            group={(country: string) => continentMap.get(country) as string}
            color={(country: string) =>
              continentColor(continentMap.get(country) as string)
            }
            examples={[
              'United States',
              'United Kingdom',
              'Italy',
              'Qatar',
              'South Africa',
            ]}
          />
        </div>

        <div
          style={{
            marginBottom: 'var(--s-rem-5)',
            color: 'var(--c-gray-500)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          <Legend>
            {uniqueContinents.map((continent) => (
              <LegendItem key={continent} color={continentColor(continent)}>
                {continent}
              </LegendItem>
            ))}
          </Legend>

          <p style={{ lineHeight: 1, marginTop: 'var(--s-rem-1)' }}>
            Circles sized by population estimates
          </p>
        </div>

        <GapminderChart
          data={data}
          annotatedCountries={[
            'China',
            'India',
            'Russia',
            'United States',
            'Equatorial Guinea',
            'Nigeria',
            'North Korea',
            'Central African Republic',
            'Qatar',
          ]}
          highlightedCountry={selectedCountry}
          domainX={[500, 200000]}
          domainY={[10, max(data, (d) => d.lifeExpectancy) as number]}
          rangeR={[4, 40]}
          minorTicksX={[
            1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 20000,
            30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
          ]}
          majorTicksX={[1000, 10000, 100000]}
          ticksY={[20, 30, 40, 50, 60, 70, 80, 90]}
          ticksZ={[1918, 1945]}
          tickFormatX={(tick) => '$' + tick / 1000 + 'k'}
          tickFormatZ={(tick: number) => {
            switch (tick) {
              case 1918:
                return `End of World War I (${tick})`;
              case 1945:
                return `End of World War II (${tick})`;
              default:
                return tick.toString();
            }
          }}
          color={(d: DataRow) =>
            continentColor(continentMap.get(d.country) as string)
          }
        />

        <p
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--c-gray-400)',
            lineHeight: 1,
            marginTop: 'var(--s-rem-2)',
          }}
        >
          Source:{' '}
          <a href="https://www.gapminder.org/" target="_blank" rel="noreferrer">
            Gapminder
          </a>
        </p>
      </main>
    </div>
  );
};

export default IndexPage;
