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
      className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col">
        <Link href={`/dashboard/expenses/${expense.expenseId}`}>
          <p className="text-lg md:text-xl font-semibold hover:text-indigo-400 transition-colors">
            {expense.expenseDescription}
          </p>
        </Link>
        <p className="text-sm text-gray-400 mt-1">
          Pagado por: {expense.paidBy?.username ?? "Usuario"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-lg md:text-xl font-bold text-bold">
          ${Number(expense.expenseAmount).toFixed(2)}
        </p>

        {currentUserId === expenseOwnerId && (
          <DeleteExpenseButton expenseId={expense.expenseId} />
        )}
      </div>
    </div>
  );

}
