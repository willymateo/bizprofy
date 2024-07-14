"use server";

import { getUserSession } from "@/utils/auth";
import { Order } from "../interfaces";
import {
  UserActivationPayload,
  CreateUserPayload,
  GetUsersResponse,
  EditUserPayload,
  GetUsersPayload,
  User,
} from "./interfaces";

const getUserById = async ({ id = "" }): Promise<User> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Invalid credentials",
    );
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Failed to fetch user",
    );
  }

  return resBody;
};

const getUsers = async ({
  order = Order.desc,
  orderByField,
  offset = 0,
  limit = 5,
}: GetUsersPayload = {}): Promise<GetUsersResponse> => {
  const user = await getUserSession();

  const url = new URL("users", process.env.BIZPROFY_API_URL);
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
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Invalid credentials",
    );
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Failed to fetch users",
    );
  }

  return resBody;
};

const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Invalid credentials",
    );
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Failed to create user",
    );
  }

  return resBody;
};

const editUserById = async ({
  id = "",
  payload,
}: {
  payload: EditUserPayload;
  id: string;
}): Promise<User> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "PATCH",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Invalid credentials",
    );
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Failed to edit user",
    );
  }

  return resBody;
};

const manageUserActivationById = async ({
  id = "",
  payload,
}: {
  payload?: UserActivationPayload;
  id: string;
}): Promise<User> => {
  const user = await getUserSession();

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/users/${id}/activation`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "PATCH",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Invalid credentials",
    );
  }

  if (!res.ok) {
    throw new Error(
      resBody?.error?.name || resBody.error?.message
        ? `${resBody?.error?.name}: ${resBody?.error?.message}`
        : "Failed to manage user activation",
    );
  }

  return resBody;
};

export { getUsers, createUser, getUserById, editUserById, manageUserActivationById };
