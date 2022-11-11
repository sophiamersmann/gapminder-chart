import type useChartDimensions from './lib/hooks/useChartDimensions';

export interface DataRow {
  country: string;
  year: number;
  gdp: number;
  lifeExpectancy: number;
  population: number;
}

export type Dimensions = ReturnType<typeof useChartDimensions>['dimensions'];
