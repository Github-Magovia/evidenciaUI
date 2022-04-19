export class SummaryData {
  Global: GlobalData;
  Countries: Array<CountryData>;
  Date: Date;

}
export class GlobalData {
  NewDeaths: number;
  NewRecovered: number;
  TotalDeaths: number;
  TotalRecovered: number
}

export class CountryData extends GlobalData {
  Country: string;
  Date: Date;
  Slug: string
}
