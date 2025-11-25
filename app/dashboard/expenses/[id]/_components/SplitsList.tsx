import { API_URL } from "@/constants";
import SplitItem from "./SplitItem";

export default async function SplitsList({ expenseId }: { expenseId: string }) {

  let splits: any[] = [];

  try {
    const res = await fetch(`${API_URL}/expensesplits/expense/${expenseId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("No se pudieron obtener los splits");

    const data = await res.json();
    splits = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al cargar splits:", error);
    return <p className="text-red-500">No se pudieron cargar los splits.</p>;
  }

  if (splits.length === 0) {
    return <p className="text-gray-400">No hay splits registrados aún.</p>;
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {splits.map((split) => (
        // <EventExpenseItem key={exp.expenseId} expense={exp} />
        <SplitItem key={split.expenseSplitId} split={split} />
      ))}
    </div>
  );
}