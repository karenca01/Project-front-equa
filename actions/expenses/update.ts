"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

function generateParticipants(
  splitUsers: FormDataEntryValue[],
  splitAmounts: FormDataEntryValue[],
  splitPercentages: FormDataEntryValue[]
) {
  return splitUsers.map((userId, index) => {
    const amount = splitAmounts[index];
    const percentage = splitPercentages[index];

    return {
      userId,
      amount: amount ? Number(amount) : null,
      percentage: percentage ? Number(percentage) : null,
    };
  });
}

export async function updateExpense(formData: FormData) {
  try {
    const expenseId = formData.get("expenseId");
    const eventId = formData.get("eventId");
    const expenseDescription = formData.get("expenseDescription");
    const expenseAmount = Number(formData.get("expenseAmount"));

    const splitUsers = formData.getAll("splitUsers");
    const splitAmounts = formData.getAll("splitAmounts");
    const splitPercentages = formData.getAll("splitPercentages");

    const participants = generateParticipants(splitUsers, splitAmounts, splitPercentages);

    const splits = participants.map((p: any) => {
      if (p.percentage !== null && p.percentage !== undefined && p.percentage !== 0) {
        return {
          userId: p.userId,
          expenseSplitPercentage: Number(p.percentage),
        };
      }

      if (p.amount !== null && p.amount !== undefined && p.amount !== 0) {
        return {
          userId: p.userId,
          expenseSplitAmount: Number(p.amount),
        };
      }

      return null;
    }).filter(Boolean);

    const body = {
      expenseDescription,
      expenseAmount,
      splits,
    };

    const res = await fetch(`${API_URL}/expenses/${expenseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(await authHeaders()),
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error(await res.text());
      throw new Error("Error al actualizar el gasto");
    }

    revalidatePath(`/dashboard/events/${eventId}`);

  } catch (error) {
    console.error("Error en updateExpense:", error);
  }
}