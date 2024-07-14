"use server";

import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Order } from "../interfaces";
import {
  GetProductsStockStatusResponse,
  GetProductsStockStatusPayload,
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
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products/${id}`, {
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
        : "Failed to fetch product",
    );
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
  const user = await getUserSession();

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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to fetch products",
    );
  }

  return resBody;
};

const getProductsStockStatus = async ({
  transactionDateGreaterThanOrEqualTo,
  orderByField = "stock_out_total_quantity",
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  offset = 0,
  limit = 5,
}: GetProductsStockStatusPayload = {}): Promise<GetProductsStockStatusResponse> => {
  const user = await getUserSession();

  const url = new URL("products/stock/status", process.env.BIZPROFY_API_URL);
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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to fetch products stock status",
    );
  }

  return resBody;
};

const createProduct = async (payload: CreateProductPayload): Promise<SimpleProduct> => {
  const user = await getUserSession();

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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to create product",
    );
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
  const user = await getUserSession();

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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to edit product",
    );
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
  const user = await getUserSession();

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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to manage product activation",
    );
  }

  return resBody;
};

export {
  manageProductActivationById,
  getProductsStockStatus,
  editProductById,
  getProductById,
  createProduct,
  getProducts,
};
