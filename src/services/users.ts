"use server";

import { CreateUserPayload } from "./interfaces";

const createUser = async (payload: CreateUserPayload) => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/users`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to create user.");
  }

  return resBody;
};

export { createUser };
