"use client";

import { useUser } from "@/context/UserContext";

export default function SplitItem({ split }: { split: any }) {
  const { user } = useUser();

  const currentUserId = user?.userId;
  const expenseOwnerId = split.expense?.paidBy?.userId;

  return (
    <div
      key={split.expenseSplitId}
      className="bg-white p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col">
        <p className="text-lg font-bold hover:text-indigo-400 transition-colors">
          {split.user?.username ?? "Usuario"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          {split.expenseSplitPercentage
            ? `${split.expenseSplitPercentage}%`
            : `$${Number(split.expenseSplitAmount).toFixed(2)}`}
        </p>
      </div>

      <div className="flex items-center">
        {split.expenseSplitAmount && (
          <p className="text-lg md:text-xl font-bold">
            ${Number(split.expenseSplitAmount).toFixed(2)}
          </p>
        )}
      </div>
    </div>
  );
}