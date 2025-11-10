"use server";

import { API_URL } from "@/constants";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function createEvent(formData: FormData) {
  const cookieStore = await cookies();

  const cookieHeader = Array.from(cookieStore.getAll())
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  let event: any = {};
  for (const key of formData.keys()) {
    event[key] = formData.get(key);
  }

  // /auth/me con las cookies del usuario
  const userRes = await fetch(`${API_URL}/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  if (!userRes.ok) {
    console.error("Error al obtener usuario:", await userRes.text());
    throw new Error("No se pudo autenticar al usuario");
  }

  const user = await userRes.json();
  event.createdBy = user.id;
  

  // se crea evento con la cookie del usuario
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });

  if (response.status === 201) {
    const newEvent = await response.json();
    revalidateTag("dashboard:events");
    redirect(`/dashboard/events/${newEvent.eventId}`);
  } else {
    console.error("Error al crear el evento:", await response.text());
    throw new Error("Error al crear evento");
  }
}
