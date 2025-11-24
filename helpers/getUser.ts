import { API_URL } from "@/constants";

export async function getUser() {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include", 
  });

  // if (!res.ok) throw new Error("No autorizado");

  const data = await res.json();
  return data;
}