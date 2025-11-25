"use server";

import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { revalidatePath } from "next/cache";

function generateParticipants(
  splitUsers: FormDataEntryValue[],
  splitAmounts: FormDataEntryValue[],
  splitPercentages: FormDataEntryValue[]
) {
  if (!splitUsers || splitUsers.length === 0) {
    throw new Error("Debes agregar al menos un participante");
  }

  return splitUsers.map((userId, index) => {
    if (splitAmounts[index] === undefined || splitPercentages[index] === undefined) {
      throw new Error("Debes proporcionar cantidad o porcentaje para cada usuario");
    }

    return {
      userId,
      amount: splitAmounts[index] ? Number(splitAmounts[index]) : null,
      percentage: splitPercentages[index] ? Number(splitPercentages[index]) : null,
    };
  });
}

export async function addExpense(formData: FormData) {
  try {
    const expenseDescription = formData.get("expenseDescription");
    const expenseAmount = Number(formData.get("expenseAmount"));
    const eventId = formData.get("eventId");

    const splitUsers = formData.getAll("splitUsers");
    const splitAmounts = formData.getAll("splitAmounts");
    const splitPercentages = formData.getAll("splitPercentages");

    const participants = generateParticipants(splitUsers, splitAmounts, splitPercentages);
    
    // console.log("Participantes:", participants);
    // console.log(formData);

    if(participants.length === 0){
      throw new Error("Debes agregar al menos un participante");
    }

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

    const headers = await authHeaders();
    console.log("Headers:", headers);

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
    console.error(error);
  }
}