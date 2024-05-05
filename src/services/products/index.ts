"use server";

import { getServerSession } from "next-auth";

import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Order, SessionPayload } from "../interfaces";
import {
  ProductActivationPayload,
  CreateProductPayload,
  GetProductsResponse,
  GetProductsPayload,
  EditProductPayload,
  SimpleProduct,
  Product,
} from "./types";

interface GetProductsProps extends GetProductsPayload {
  abortController?: AbortController;
}

const getProductById = async ({ id = "" }): Promise<Product> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/${id}`, {
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
    throw new Error(resBody.error?.message || "Failed to fetch product");
  }

  return resBody;
};

const getProducts = async ({
  unitPriceGreaterThanOrEqualTo,
  unitPriceLessThanOrEqualTo,
  order = Order.desc,
  abortController,
  offset = 0,
  limit = 5,
  q = "",
}: GetProductsProps = {}): Promise<GetProductsResponse> => {
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
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to fetch product");
  }

  return resBody;
};

const createProduct = async (payload: CreateProductPayload): Promise<SimpleProduct> => {
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
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to create product");
  }

  return resBody;
};

const editProductById = async ({
  id = "",
  payload,
}: {
  payload: EditProductPayload;
  id: string;
}): Promise<SimpleProduct> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "PATCH",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to edit product");
  }

  return resBody;
};

const manageProductActivationById = async ({
  id = "",
  payload,
}: {
  payload?: ProductActivationPayload;
  id: string;
}): Promise<Product> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/${id}/activation`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "PATCH",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to manage product activation");
  }

  return resBody;
};

export { getProductById, createProduct, getProducts, editProductById, manageProductActivationById };
