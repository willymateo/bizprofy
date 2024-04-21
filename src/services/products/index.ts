"use server";

import { getServerSession } from "next-auth";

import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { Order, SessionPayload } from "../interfaces";
import {
  GetProductCategoriesResponse,
  CreateProductCategoryPayload,
  GetProductCategoriesPayload,
  EditProductCategoryPayload,
  CreateProductPayload,
  GetProductsResponse,
  GetProductsPayload,
  ProductCategory,
  Product,
} from "./interfaces";

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

const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
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

const getProductCategoryById = async ({ id = "" }): Promise<ProductCategory> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/categories/${id}`, {
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
    throw new Error(resBody.error?.message || "Failed to fetch product category");
  }

  return resBody;
};

const getProductCategories = async ({
  order = Order.desc,
  orderByField,
  offset = 0,
  limit = 5,
  q = "",
}: GetProductCategoriesPayload = {}): Promise<GetProductCategoriesResponse> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const url = new URL("products/categories", process.env.BIZPROFY_API_URL);
  const searchParams = new URLSearchParams();

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

  if (q) {
    searchParams.append("q", q);
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
    throw new Error(resBody.error?.message || "Failed to fetch product categories");
  }

  return resBody;
};

const createProductCategory = async (
  payload: CreateProductCategoryPayload,
): Promise<ProductCategory> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/categories`, {
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
    throw new Error(resBody.error?.message || "Failed to create product category");
  }

  return resBody;
};

const editProductCategory = async ({
  id = "",
  payload,
}: {
  payload: EditProductCategoryPayload;
  id: string;
}): Promise<ProductCategory> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as SessionPayload;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/categories/${id}`, {
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
    throw new Error(resBody.error?.message || "Failed to edit product category");
  }

  return resBody;
};

export {
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
  editProductCategory,
  createProduct,
  getProducts,
};
