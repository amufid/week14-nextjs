import base_URL from "../lib/baseUrl";

export async function Login(params) {
  const res = await fetch(`${base_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res) {
    throw new Error("Error to fetch data");
  }

  return res;
}

export async function Register(params) {
  const res = await fetch(`${base_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res;
}
