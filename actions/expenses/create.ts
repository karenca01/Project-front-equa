"use server"
import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { redirect } from "next/navigation";

export default async function addExpense(formData: FormData){
    const headers = await authHeaders();

    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (!key.startsWith("$")) data[key] = value;
    });

    const response = await fetch(`${API_URL}/expenses`, {
            method: "POST",
            headers: {
                ...headers,
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    
        if (response.ok) {
            redirect("/login");
        }
        return;

}