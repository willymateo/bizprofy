"use server";

import { SessionPayload } from "../interfaces";
import { LoginPayload } from "./interfaces";

const login = async ({ emailOrUsername, password }: LoginPayload): Promise<SessionPayload> => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/auth/login`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername,
      password,
    }),
    method: "POST",
  });

  const resBody = await res.json();

  if (res.status === 401) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Invalid credentials");
  }

  if (!res.ok) {
    throw new Error(resBody.error?.message || resBody.error?.message || "Failed to login");
  }

  return resBody;
};

export { login };