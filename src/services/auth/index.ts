"use server";

import { SessionPayload } from "../interfaces";
import { LoginPayload, SignUpPayload } from "./interfaces";

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

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to login");
  }

  return resBody;
};

const signUp = async (payload: SignUpPayload) => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/auth/signUp`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    method: "POST",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to sign up");
  }

  return resBody;
};

export { login, signUp };
