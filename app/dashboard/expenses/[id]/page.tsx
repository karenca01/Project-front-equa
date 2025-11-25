import { API_URL } from "@/constants";
import { authHeaders } from "@/helpers/authHeaders";
import { Expense } from "@/entities";
import SplitsList from "./_components/SplitsList";
import UpdateExpense from "./_components/UpdateExpense";
import FormEditExpense from "./_components/FormEditExpense";

export default async function ExpensePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const headers = await authHeaders();

  const res = await fetch(`${API_URL}/expenses/${id}`, {
    headers: {
      ...headers,
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("No se pudo cargar el gasto");
  }

  const expense: Expense = await res.json();
  const participants = expense.splits ?? [];

  return (
    <div className="flex flex-col w-10/12 min-h-screen p-6 space-y-6">
      {/* Header del gasto */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold">{expense.expenseDescription}</h1>
          <p className="text-lg md:text-xl mt-1">
            <b>Registrado por:</b> {expense.paidBy?.username || "Desconocido"}
          </p>
        </div>

        <div className="flex items-center">
          <UpdateExpense>
            <FormEditExpense expense={expense} participants={participants} />
          </UpdateExpense>
        </div>
      </div>

      {/* Separador */}
      <div className="w-full border-t border-gris-muy-fuerte" />

      {/* Sección de Splits */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">Splits</h2>
        <div className="overflow-y-auto max-h-96">
          <SplitsList expenseId={id} />
        </div>
      </div>
    </div>
  );
}