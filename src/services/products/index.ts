"use server";

import { getServerSession } from "next-auth";

import { CreateProductPayload, GetProductsPayload } from "./interfaces";
import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Product } from "@/app/(dashboard)/products/interfaces";
import { SessionPayload } from "../interfaces";

interface GetProductsProps extends GetProductsPayload {
  abortController?: AbortController;
}

const getProducts = async ({
  unitPriceGreaterThanOrEqualTo,
  unitPriceLessThanOrEqualTo,
  abortController,
  offset,
  limit,
  order,
  q,
}: GetProductsProps = {}): Promise<Product[]> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const url = new URL("products", process.env.BIZPROFY_API_URL);

  const searchParams = new URLSearchParams();

  if (unitPriceGreaterThanOrEqualTo) {
    searchParams.append("unitPriceGreaterThanOrEqualTo", unitPriceGreaterThanOrEqualTo.toString());
  }

  if (unitPriceLessThanOrEqualTo) {
    searchParams.append("unitPriceLessThanOrEqualTo", unitPriceLessThanOrEqualTo.toString());
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

  if (q) {
    searchParams.append("q", q);
  }

  url.search = searchParams.toString();

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    signal: abortController?.signal,
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Failed to fetch products");
  }

  return resBody;
};

const createProduct = async (payload: CreateProductPayload) => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Failed to create product");
  }

  return resBody;
};

export { getProducts, createProduct };
