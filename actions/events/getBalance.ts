"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";

export async function getEventBalance(eventId: string) {
  const headers = await authHeaders();

  const res = await fetch(`${API_URL}/events/${eventId}/balances`, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}