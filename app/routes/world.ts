const KEY = process.env.NEXT_PUBLIC_COUNTRY_API;

if (!KEY) throw new Error("NEXT_PUBLIC_COUNTRY_API is not set in your .env");

type Currency = {
  name: string;
  symbol: string;
};

type CountryApiResponse = {
  name: { common: string };
  capital?: string[];
  region: string;
  population: number;
  languages?: Record<string, string>;
  currencies?: Record<string, Currency>;
  timezones?: string[];
  flags?: { png: string };
  maps?: { googleMaps: string };
};

export type CountryData = {
  name: string;
  capital: string[];
  region: string;
  population: number;
  languages: string[];
  currencyNames: string[];
  timezones: string[];
  flag: string;
  map: string;
};

export const worldLoader = async (
  countryName: string
): Promise<CountryData> => {
  const res = await fetch(
    `${KEY}/name/${countryName}?fields=name,capital,region,population,languages,currencies,timezones,flags,maps`
  );

  if (!res.ok) {
    throw new Error(`API request failed: ${res.status}`);
  }

  const data: CountryApiResponse[] = await res.json();

  if (!data || data.length === 0) {
    throw new Error("No country data found");
  }

  const country = data[0];

  return {
    name: country.name?.common || "Unknown",
    capital: country.capital || [],
    region: country.region || "Unknown",
    population: country.population || 0,
    languages: country.languages ? Object.values(country.languages) : [],
    currencyNames: country.currencies
      ? Object.values(country.currencies).map((c) => c.name)
      : [],
    timezones: country.timezones || [],
    flag: country.flags?.png || "",
    map: country.maps?.googleMaps || "",
  };
};
