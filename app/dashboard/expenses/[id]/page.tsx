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
    <div className="flex flex-col justify-center w-9/12 h-[100vh] p-5">
      <div className="flex flex-row h-3/12">
        <div className="flex flex-col justify-center w-9/12 h-full">
          <h1 className="text-5xl font-bold py-4">
            {expense.expenseDescription}
          </h1>
          <p className="text-xl">
            <b>Registrado por: </b>
            {expense.paidBy?.username || "Desconocido"}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center w-3/12 pt-4 h-full">
          <UpdateExpense>
            <FormEditExpense expense={expense} participants={participants} />
          </UpdateExpense>
        </div>
      </div>

      <div className="w-full bg-gris-fuerte h-1" />

      <div className="w-full h-9/12 p-5">
        <h2 className="text-2xl font-semibold mb-2">Splits</h2>
        <SplitsList expenseId={id}/>
      </div>
    </div>
  );
}