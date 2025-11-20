"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export default async function deleteEvent(eventId: string, formData: FormData){
    const headers = await authHeaders();
    const response = await fetch(`${API_URL}/events/${eventId}`,{
        method: "DELETE",
        headers: {
            ...headers,
        },
    })
    if(response.status === 200){
        revalidateTag("dashboard:events")
        redirect("/dashboard/events")
    }
}