"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  let event: any = {};

  for (const key of formData.keys()) {
    event[key] = formData.get(key);
  }

  // 👇 Espera los headers aquí
  const headers = await authHeaders();

  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (response.status === 201) {
    const newEvent = await response.json(); // ✅ Recibe el evento creado
    revalidateTag("dashboard:events");
    redirect(`/dashboard/events/${newEvent.eventId}`); // ✅ Usa el ID real
  }else {
    console.error("Error al crear el evento:", await response.text());
  }
}