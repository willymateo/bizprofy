"use server";

import { getServerSession } from "next-auth";

import { CreateStockPayload, GetStockResponse, GetStockPayload } from "./interfaces";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Order, SessionPayload } from "../interfaces";

const getStock = async ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  quantityGreaterThanOrEqualTo = 0,
  quantityLessThanOrEqualTo,
  order = Order.desc,
  stockTypeIds = [],
  productIds = [],
  orderByField,
  offset = 0,
  limit = 5,
}: GetStockPayload = {}): Promise<GetStockResponse> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const url = new URL("stock", process.env.BIZPROFY_API_URL);
  const searchParams = new URLSearchParams();

  if (transactionDateGreaterThanOrEqualTo) {
    searchParams.append("transactionDateGreaterThanOrEqualTo", transactionDateGreaterThanOrEqualTo);
  }

  if (quantityGreaterThanOrEqualTo) {
    searchParams.append("quantityGreaterThanOrEqualTo", quantityGreaterThanOrEqualTo.toString());
  }

  if (transactionDateLessThanOrEqualTo) {
    searchParams.append("transactionDateLessThanOrEqualTo", transactionDateLessThanOrEqualTo);
  }

  if (quantityLessThanOrEqualTo) {
    searchParams.append("quantityLessThanOrEqualTo", quantityLessThanOrEqualTo.toString());
  }

  if (stockTypeIds?.length) {
    searchParams.append("stockTypeIds", stockTypeIds.join(","));
  }

  if (productIds?.length) {
    searchParams.append("productIds", productIds.join(","));
  }

  if (orderByField) {
    searchParams.append("orderByField", orderByField);
  }

  if (offset) {
    searchParams.append("offset", offset.toString());
  }

  if (limit) {
    searchParams.append("limit", limit.toString());
  }

  if (order) {
    searchParams.append("order", order);
  }

  url.search = searchParams.toString();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to fetch stock");
  }

  return resBody;
};

const createStock = async (payload: CreateStockPayload) => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/stock`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to create stock");
  }

  return resBody;
};

export { getStock, createStock };
