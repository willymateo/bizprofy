"use server";

import { getServerSession } from "next-auth";

import { authConfig } from "@/app/api/auth/[...nextauth]/constants";
import { CreateProductPayload, LoginResponse } from "./interfaces";
import { Product } from "@/app/(dashboard)/products/interfaces";

const getProducts = async (): Promise<Product[]> => {
  const session = await getServerSession(authConfig);
  const user = session?.user as LoginResponse;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Failed to fetch products");
  }

  return resBody;
};

const createProduct = async (payload: CreateProductPayload) => {
  const session = await getServerSession(authConfig);
  const user = session?.user as LoginResponse;

  const res = await fetch(`${process.env.BIZPROFY_API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Failed to create product");
  }

  return resBody;
};

export { getProducts, createProduct };
