"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function updateUser(userId: string, formData: FormData) {
    const headers = await authHeaders();

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (!key.startsWith("$")) data[key] = value;
    });

    data.userPassword = formData.get("userPassword") ? formData.get("userPassword") : undefined

    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "PATCH",
        headers: {
            ...headers,
            "content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        revalidateTag("dashboard:users");
        revalidateTag(`dashboard:users:${userId}`);
    }
    return;
}
