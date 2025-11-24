"use server";
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidateTag } from "next/cache";

export default async function deleteExpense(expenseId: string){
    const headers = await authHeaders();
    const response = await fetch(`${API_URL}/expenses/${expenseId}`,{
        method: "DELETE",
        headers: {
            ...headers,
        },
    })
    if(response.status === 200){
        revalidateTag("dashboard:events");
    }
}