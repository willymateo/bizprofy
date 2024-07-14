"use server";

import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Order } from "../interfaces";
import {
  GetCustomersStockStatusResponse,
  GetCustomersStockStatusPayload,
  CustomerActivationPayload,
  CreateCustomerPayload,
  GetCustomersResponse,
  GetCustomersPayload,
  EditCustomerPayload,
  Customer,
} from "./interfaces";

const getCustomerById = async ({ id = "" }): Promise<Customer> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/customers/${id}`, {
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
        : "Failed to fetch customer",
    );
  }

  return resBody;
};

const getCustomers = async ({
  order = Order.desc,
  orderByField,
  offset = 0,
  limit = 5,
  q = "",
}: GetCustomersPayload = {}): Promise<GetCustomersResponse> => {
  const user = await getUserSession();

  const url = new URL("customers", process.env.BIZPROFY_API_URL);
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
    redirect("/auth/logout");
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name ?? ""}: ${resBody?.error?.message ?? ""}`
        : "Failed to fetch customers",
    );
  }

  return resBody;
};

const getCustomersStockStatus = async ({
  orderByField = "stock_out_total_quantity",
  transactionDateGreaterThanOrEqualTo,
  transactionDateLessThanOrEqualTo,
  order = Order.desc,
  offset = 0,
  limit = 5,
}: GetCustomersStockStatusPayload = {}): Promise<GetCustomersStockStatusResponse> => {
  const user = await getUserSession();

  const url = new URL("customers/stock/status", process.env.BIZPROFY_API_URL);
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
        : "Failed to fetch customers stock status",
    );
  }

  return resBody;
};

const createCustomer = async (payload: CreateCustomerPayload): Promise<Customer> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/customers`, {
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
        : "Failed to create customer",
    );
  }

  return resBody;
};

const editCustomerById = async ({
  id = "",
  payload,
}: {
  payload: EditCustomerPayload;
  id: string;
}): Promise<Customer> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/customers/${id}`, {
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
        : "Failed to edit customer",
    );
  }

  return resBody;
};

const manageCustomerActivationById = async ({
  id = "",
  payload,
}: {
  payload?: CustomerActivationPayload;
  id: string;
}): Promise<Customer> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/customers/${id}/activation`, {
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
        : "Failed to manage customer activation",
    );
  }

  return resBody;
};

export {
  manageCustomerActivationById,
  getCustomersStockStatus,
  editCustomerById,
  getCustomerById,
  createCustomer,
  getCustomers,
};
