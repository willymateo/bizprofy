"use server";

import { Order } from "@/services/interfaces";
import { getUserSession } from "@/utils/auth";
import {
  GetProductCategoriesStockStatusResponse,
  GetProductCategoriesStockStatusPayload,
  ProductCategoryActivationPayload,
  GetProductCategoriesResponse,
  CreateProductCategoryPayload,
  GetProductCategoriesPayload,
  EditProductCategoryPayload,
  ProductCategory,
} from "./types";

const getProductCategoryById = async ({ id = "" }): Promise<ProductCategory> => {
  const user = await getUserSession();

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
  const user = await getUserSession();

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

const getProductCategoriesStockStatus = async ({
  orderByField = "stock_out_total_quantity",
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  offset = 0,
  limit = 5,
}: GetProductCategoriesStockStatusPayload = {}): Promise<GetProductCategoriesStockStatusResponse> => {
  const user = await getUserSession();

  const url = new URL("products/categories/stock/status", process.env.BIZPROFY_API_URL);
  const searchParams = new URLSearchParams();

  if (transactionDateGreaterThanOrEqualTo) {
    searchParams.append("transactionDateGreaterThanOrEqualTo", transactionDateGreaterThanOrEqualTo);
  }

  if (transactionDateLessThanOrEqualTo) {
    searchParams.append("transactionDateLessThanOrEqualTo", transactionDateLessThanOrEqualTo);
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
    throw new Error(resBody.error?.message || "Failed to fetch products stock status");
  }

  return resBody;
};

const createProductCategory = async (
  payload: CreateProductCategoryPayload,
): Promise<ProductCategory> => {
  const user = await getUserSession();

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

const editProductCategoryById = async ({
  id = "",
  payload,
}: {
  payload: EditProductCategoryPayload;
  id: string;
}): Promise<ProductCategory> => {
  const user = await getUserSession();

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

const manageProductCategoryActivationById = async ({
  id = "",
  payload,
}: {
  payload?: ProductCategoryActivationPayload;
  id: string;
}): Promise<ProductCategory> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/categories/${id}/activation`, {
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
    throw new Error(resBody.error?.message || "Failed to manage product category activation");
  }

  return resBody;
};

export {
  manageProductCategoryActivationById,
  getProductCategoriesStockStatus,
  editProductCategoryById,
  getProductCategoryById,
  createProductCategory,
  getProductCategories,
};
