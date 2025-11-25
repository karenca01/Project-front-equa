"use client";

import { useUser } from "@/context/UserContext";

export default function SplitItem({ split }: { split: any }) {
  const { user } = useUser();

  const currentUserId = user?.userId;
  const expenseOwnerId = split.expense?.paidBy?.userId;

  return (
    <div
      key={split.expenseSplitId}
      className="border border-gray-200 p-4 rounded-lg flex justify-between items-center"
    >
      <div>
        <p className="text-lg font-semibold">
          {split.user?.username ?? "Usuario"}
        </p>
        <p className="text-sm text-gris-intermedio">
          {split.expenseSplitPercentage
            ? `${split.expenseSplitPercentage}%`
            : `$${Number(split.expenseSplitAmount).toFixed(2)}`}
        </p>
      </div>

      <div className="flex flex-row justify-center items-center gap-5">
        <p className="text-xl font-bold">
          {split.expenseSplitAmount &&
            `$${Number(split.expenseSplitAmount).toFixed(2)}`}
        </p>

        {currentUserId === expenseOwnerId && (
            <p>botón para editar el split</p>
        //   <DeleteSplitButton splitId={split.expenseSplitId} />
        )}
      </div>
    </div>
  );
}