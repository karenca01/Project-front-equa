"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { redirect } from "next/navigation";

export async function addParticipants(formData: FormData) {
  const headers = await authHeaders();

  const eventId = formData.get("eventId");
  const participants = JSON.parse(formData.get("participants") as string);

  await fetch(`${API_URL}/events/add-participants/${eventId}`, {
    method: "POST",
    headers: {
      ...headers,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      participants, 
    }),
  });

  redirect(`/dashboard/events/${eventId}`); 
}
