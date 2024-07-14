"use server";

import { getUserSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import { Order } from "../interfaces";
import {
  WarehouseActivationPayload,
  CreateWarehousePayload,
  GetWarehousesResponse,
  GetWarehousesPayload,
  EditWarehousePayload,
  Warehouse,
} from "./interfaces";

const getWarehouseById = async ({ id = "" }): Promise<Warehouse> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/warehouses/${id}`, {
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
        : "Failed to fetch warehouse",
    );
  }

  return resBody;
};

const getWarehouses = async ({
  order = Order.desc,
  orderByField,
  offset = 0,
  limit = 5,
  q = "",
}: GetWarehousesPayload = {}): Promise<GetWarehousesResponse> => {
  const user = await getUserSession();

  const url = new URL("warehouses", process.env.BIZPROFY_API_URL);
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
        : "Failed to fetch warehouses",
    );
  }

  return resBody;
};

const createWarehouse = async (payload: CreateWarehousePayload): Promise<Warehouse> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/warehouses`, {
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
        : "Failed to create warehouse",
    );
  }

  return resBody;
};

const editWarehouseById = async ({
  id = "",
  payload,
}: {
  payload: EditWarehousePayload;
  id: string;
}): Promise<Warehouse> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/warehouses/${id}`, {
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
        : "Failed to edit warehouse",
    );
  }

  return resBody;
};

const manageWarehouseActivationById = async ({
  id = "",
  payload,
}: {
  payload?: WarehouseActivationPayload;
  id: string;
}): Promise<Warehouse> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/warehouses/${id}/activation`, {
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
        : "Failed to manage warehouse activation",
    );
  }

  return resBody;
};

export {
  manageWarehouseActivationById,
  editWarehouseById,
  getWarehouseById,
  createWarehouse,
  getWarehouses,
};
