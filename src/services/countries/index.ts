"use server";

import { redirect } from "next/navigation";

import {
  GetStatesByCountryCodePayload,
  GetCitiesByStateCodePayload,
  GetCountriesPayload,
  CountryState,
  Country,
  City,
} from "./types";

const getCountries = async ({ abortController = null }: GetCountriesPayload = {}): Promise<
  Country[]
> => {
  const url = new URL("countries", process.env.BIZPROFY_API_URL);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    signal: abortController?.signal,
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to fetch countries",
    );
  }

  return resBody;
};

const getStatesByCountryCode = async ({
  countryCode = "",
}: GetStatesByCountryCodePayload): Promise<CountryState[]> => {
  if (!countryCode) {
    throw new Error("countryCode is required");
  }

  const url = new URL(`countries/${countryCode}/states`, process.env.BIZPROFY_API_URL);

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to get states by country code",
    );
  }

  return resBody;
};

const getCitiesByCountryCodeAndStateCode = async ({
  countryStateCode = "",
  countryCode = "",
}: GetCitiesByStateCodePayload): Promise<City[]> => {
  if (!countryStateCode) {
    throw new Error("countryStateCode is required");
  }

  const url = new URL(
    `countries/${countryCode}/states/${countryStateCode}/cities`,
    process.env.BIZPROFY_API_URL,
  );

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to get cities by state code",
    );
  }

  return resBody;
};

export { getCountries, getStatesByCountryCode, getCitiesByCountryCodeAndStateCode };
