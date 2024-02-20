import { ErrorResponse, LoginPayload, LoginResponse } from "./interfaces";

const login = async (credentials: LoginPayload) => {
  const res = await fetch(`${process.env.BIZPROFY_API_URL}/auth/login`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    method: "POST",
  });

  const resBody: LoginResponse | ErrorResponse = await res.json();

  if (!res.ok) {
    throw new Error(resBody.error?.message || "Failed to login");
  }

  return resBody;
};

export { login };
