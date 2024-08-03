export type GetCountriesPayload = {
  abortController?: AbortController | null;
};

export type Country = {
  phoneCode?: string;
  currency?: string;
  isoCode: string;
  name: string;
};

export type GetStatesByCountryCodePayload = {
  countryCode: string;
};

export type CountryState = {
  countryCode?: string;
  isoCode: string;
  name: string;
};

export type GetCitiesByStateCodePayload = {
  countryStateCode: string;
  countryCode: string;
};

export type City = {
  countryCode?: string;
  stateCode?: string;
  name: string;
};
