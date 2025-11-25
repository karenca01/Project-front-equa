"use client";

import {updateExpense} from "@/actions/expenses/update";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { ExpenseSplitsEdit } from "./FormExpenseSplitsEdit";

export default function FormEditExpense({
  expense,
  participants,
}: {
  expense: any;
  participants: any[];
}) {
  return (
    <form
      action={updateExpense}
      className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
    >
      <h1 className="text-3xl font-bold text-center">Editar gasto</h1>

      <input type="hidden" name="expenseId" value={expense.expenseId} />
      <input type="hidden" name="eventId" value={expense.event.eventId} />

      <Input
        label="Gasto"
        name="expenseDescription"
        type="text"
        size="md"
        isRequired
        defaultValue={expense.expenseDescription}
      />

      <Input
        label="Monto"
        name="expenseAmount"
        type="number"
        size="md"
        isRequired
        defaultValue={expense.expenseAmount}
      />

      <ExpenseSplitsEdit
        participants={participants}
        existingSplits={expense.splits}
      />

      <Button type="submit" className="bg-gris-fuerte hover:bg-gray-600">
        Guardar cambios
      </Button>
    </form>
  );
}