"use client";

import Link from "next/link";
import DeleteExpenseButton from "./DeleteExpenseButton";
import { useUser } from "@/context/UserContext";

export default function EventExpenseItem({ expense }: { expense: any }) {
  const { user } = useUser();

  const currentUserId = user?.userId;
  const expenseOwnerId = expense.paidBy?.userId;

  return (
    <div
      key={expense.expenseId}
      className="border border-gray-200 p-4 rounded-lg flex justify-between items-center"
    >
      <div>
        <Link href={`/dashboard/expenses/${expense.expenseId}`}>
          <p className="text-lg font-semibold">{expense.expenseDescription}</p>
        </Link>
        <p className="text-sm text-gris-intermedio">
          Pagado por: {expense.paidBy?.username ?? "Usuario"}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center gap-5">
        <p className="text-xl font-bold">
          ${Number(expense.expenseAmount).toFixed(2)}
        </p>

        {currentUserId === expenseOwnerId && (
          <DeleteExpenseButton expenseId={expense.expenseId} />
        )}
      </div>
    </div>
  );
}
