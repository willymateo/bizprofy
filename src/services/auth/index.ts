"use server";

import { SessionPayload } from "../interfaces";
import {
  VerifyEmailResponse,
  VerifyEmailPayload,
  SignUpResponse,
  SignUpPayload,
  LoginPayload,
} from "./types";

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

const signUp = async (payload: SignUpPayload): Promise<SignUpResponse> => {
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

const verifyEmail = async (payload: VerifyEmailPayload): Promise<VerifyEmailResponse> => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/auth/email-verification`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    method: "PATCH",
  });

  const resBody = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to verify email");
  }

  return resBody;
};

export { login, signUp, verifyEmail };
