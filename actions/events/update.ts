"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateEvent(eventId: string, formData: FormData) {
    const headers = await authHeaders();

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (!key.startsWith("$")) data[key] = value;
    });

    const response = await fetch(`${API_URL}/events/${eventId}`, {
        method: "PATCH",
        headers: {
            ...headers,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        revalidateTag("dashboard:events");
        revalidateTag(`dashboard:events:${eventId}`);
    }
    return;
}