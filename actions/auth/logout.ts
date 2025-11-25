"use server";

import { API_URL } from "@/constants";
import { revalidatePath } from "next/cache";

export async function logout() {
  try {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    revalidatePath("/", "layout");

    return { success: true };
  } catch (error) {
    console.error("Error en logout:", error);
    return { success: false };
  }
}