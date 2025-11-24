"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

export async function addExpense(formData: FormData) {
  try {
    const expenseDescription = formData.get("expenseDescription");
    const expenseAmount = Number(formData.get("expenseAmount"));
    const eventId = formData.get("eventId");

    const raw = formData.get("participants");
    const participants = raw ? JSON.parse(raw as string) : [];

    const splits = participants.map((p: any) => {

      if (p.percentage !== null && p.percentage !== undefined) {
        return {
          userId: p.userId,
          expenseSplitPercentage: Number(p.percentage),
        };
      }

      if (p.amount !== null && p.amount !== undefined) {
        return {
          userId: p.userId,
          expenseSplitAmount: Number(p.amount),
        };
      }

      throw new Error("Cada participante debe tener amount o percentage");
    });

    const body = {
      expenseDescription,
      expenseAmount,
      eventId,
      splits,
    };

    // console.log("Body enviado:", body);

    const res = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        ...(await authHeaders())
    },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
    //   console.log(await res.text());
      throw new Error("Error al crear el gasto");
    }

    revalidatePath(`/dashboard/events/${eventId}`);
  } catch (error) {
    // console.error("Error en addExpense:", error);
    throw error;
  }
}