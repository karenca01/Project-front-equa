import { API_URL } from "@/constants";
import EventExpenseItem from "./ExpenseItem";

export default async function EventExpensesList({ eventId }: { eventId: string }) {

  let expenses: any[] = [];

  try {
    const res = await fetch(`${API_URL}/expenses/event/${eventId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudieron obtener los gastos");

    const data = await res.json();
    expenses = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al cargar gastos:", error);
    return <p className="text-red-500">No se pudieron cargar los gastos.</p>;
  }

  if (expenses.length === 0) {
    return <p className="text-gray-400">No hay gastos registrados aún.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {expenses.map((exp) => (
        <EventExpenseItem key={exp.expenseId} expense={exp} />
      ))}
    </div>
  );
}