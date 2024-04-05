"use server";

import { getServerSession } from "next-auth";

import { GetCurrentStockPayload, GetCurrentStockResponse } from "./interfaces";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Order, SessionPayload } from "../../interfaces";

const getCurrentStock = async ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  warehouseIds = [],
  productIds = [],
  orderByField,
  offset = 0,
  limit = 5,
}: GetCurrentStockPayload = {}): Promise<GetCurrentStockResponse> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const url = new URL("stock/current", process.env.BIZPROFY_API_URL);
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
    throw new Error(resBody.error?.message || "Failed to fetch current stock");
  }

  return resBody;
};

export { getCurrentStock };
