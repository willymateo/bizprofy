"use server";

import { LoginPayload } from "./interfaces";

const login = async ({ emailOrUsername, password }: LoginPayload) => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/auth/login`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      emailOrUsername,
      password,
    }),
    method: "POST",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to login");
  }

  return resBody;
};

export { login };
