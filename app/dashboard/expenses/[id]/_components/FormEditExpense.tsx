"use client";

import { useState } from "react";
import { updateExpense } from "@/actions/expenses/update";
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
  const [showError, setShowError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const expenseDescription = formData.get("expenseDescription") as string;
    const expenseAmount = Number(formData.get("expenseAmount"));

    const splitUsers = formData.getAll("splitUsers") as string[];
    const splitAmounts = formData.getAll("splitAmounts").map((v) => Number(v));
    const splitPercentages = formData.getAll("splitPercentages").map((v) => Number(v));

    const splitAmountsNums = splitAmounts.map((a) => (isNaN(a) ? null : a));
    const splitPercentagesNums = splitPercentages.map((p) => (isNaN(p) ? null : p));

    if (splitUsers.some((u) => u === "")) {
      setShowError("Debes seleccionar un participante en todos los splits");
      return;
    }

    let splitsUseAmount = false;
    let splitsUsePercentage = false;

    for (let i = 0; i < splitUsers.length; i++) {
      const amount = splitAmountsNums[i];
      const percent = splitPercentagesNums[i];

      if (
        (amount !== null &&
          percent !== null &&
          amount > 0 &&
          percent > 0) ||
        (amount === null && percent === null)
      ) {
        setShowError(`Por split debes usar solo monto o solo porcentaje`);
        return;
      }

      if (amount !== null && amount > 0) splitsUseAmount = true;
      if (percent !== null && percent > 0) splitsUsePercentage = true;
    }

    if (splitsUseAmount && splitsUsePercentage) {
      setShowError("No puedes mezclar montos y porcentajes en un mismo gasto");
      return;
    }

    if (splitsUseAmount) {
      const totalSplits = splitAmountsNums.reduce<number>(
        (acc, v) => acc + (v ?? 0),
        0
      );

      if (totalSplits !== expenseAmount) {
        setShowError(
          `La suma de los montos (${totalSplits}) no coincide con el total (${expenseAmount})`
        );
        return;
      }
    }

    if (splitsUsePercentage) {
      const totalPercent = splitPercentagesNums.reduce<number>(
        (acc, p) => acc + (p ?? 0),
        0
      );

      if (totalPercent !== 100) {
        setShowError(
          `La suma de los porcentajes (${totalPercent}%) debe ser 100%`
        );
        return;
      }
    }

    setShowError("");

    updateExpense(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg"
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

      {showError && <p className="text-red-600 font-semibold">{showError}</p>}

      <Button type="submit" color="success" variant="flat" className="w-fit">
        Guardar cambios
      </Button>
    </form>
  );
}
