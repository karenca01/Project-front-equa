import { API_URL } from "@/constants";

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
      {expenses.map((exp: any) => (
        <div
          key={exp.expenseId}
          className="border border-gray-200 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-lg font-semibold">{exp.expenseDescription}</p>
            <p className="text-sm text-gris-intermedio">
              Pagado por: {exp.paidBy?.username ?? "Usuario"}
            </p>
          </div>
          <p className="text-xl font-bold">
            ${Number(exp.expenseAmount).toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}