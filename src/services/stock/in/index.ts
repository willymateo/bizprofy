"use server";

import { getServerSession } from "next-auth";

import { CreateStockInPayload, GetStockInPayload, GetStockInResponse, StockIn } from "./interfaces";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Order, SessionPayload } from "../../interfaces";

const getStockIn = async ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  warehouseIds = [],
  productIds = [],
  orderByField,
  offset = 0,
  limit = 5,
}: GetStockInPayload = {}): Promise<GetStockInResponse> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const url = new URL("stock/in", process.env.BIZPROFY_API_URL);
  const searchParams = new URLSearchParams();

  if (transactionDateGreaterThanOrEqualTo) {
    searchParams.append("transactionDateGreaterThanOrEqualTo", transactionDateGreaterThanOrEqualTo);
  }

  if (transactionDateLessThanOrEqualTo) {
    searchParams.append("transactionDateLessThanOrEqualTo", transactionDateLessThanOrEqualTo);
  }

  if (warehouseIds?.length) {
    searchParams.append("warehouseIds", warehouseIds.join(","));
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
    throw new Error(resBody.error?.message || "Failed to fetch stock in");
  }

  return resBody;
};

const createStockIn = async (payload: CreateStockInPayload): Promise<StockIn> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/stock/in`, {
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
    throw new Error(resBody.error?.message || "Failed to create stock in");
  }

  return resBody;
};

export { getStockIn, createStockIn };
