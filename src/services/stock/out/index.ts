"use server";

import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Order } from "../../interfaces";
import {
  CreateStockOutPayload,
  GetStockOutResponse,
  GetStockOutPayload,
  StockOut,
} from "./interfaces";

const getStockOut = async ({
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  warehouseIds = [],
  productIds = [],
  orderByField,
  offset = 0,
  limit = 5,
}: GetStockOutPayload = {}): Promise<GetStockOutResponse> => {
  const user = await getUserSession();

  const url = new URL("stock/out", process.env.BIZPROFY_API_URL);
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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to fetch stock out",
    );
  }

  return resBody;
};

const createStockOut = async (payload: CreateStockOutPayload): Promise<StockOut> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/stock/out`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to create stock out",
    );
  }

  return resBody;
};

export { getStockOut, createStockOut };
