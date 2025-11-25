"use client";

import { useState } from "react";
import { addExpense } from "@/actions/expenses/create";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { ExpenseSplits } from "./ExpenseSplits";

export default function FormAddExpense({ eventId, participants }: { eventId: string, participants: any[] }) {
  const [showError, setShowError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const expenseDescription = formData.get("expenseDescription");
    const expenseAmount = Number(formData.get("expenseAmount"));

    const splitUsers = formData.getAll("splitUsers");
    const splitAmounts = formData.getAll("splitAmounts").map(v => Number(v));
    const splitPercentages = formData.getAll("splitPercentages").map(v => Number(v));

    // Validar que todos los participantes estén seleccionados
    if (splitUsers.some(u => u === "")) {
      setShowError("Debes seleccionar un participante en todos los splits");
      return;
    }

    // Validación de montos o porcentajes
    const usingPercentages = splitPercentages.some(p => !isNaN(p) && p > 0);
    if (usingPercentages) {
      const totalPercent = splitPercentages.reduce((acc, p) => acc + (isNaN(p) ? 0 : p), 0);
      if (totalPercent !== 100) {
        setShowError(`La suma de los porcentajes (${totalPercent}%) debe ser 100%`);
        return;
      }
    } else {
      const totalSplits = splitAmounts.reduce((acc, v) => acc + (isNaN(v) ? 0 : v), 0);
      if (totalSplits !== expenseAmount) {
        setShowError(`La suma de los montos (${totalSplits}) no coincide con el total (${expenseAmount})`);
        return;
      }
    }

    setShowError("");

    // Llamar al action
    addExpense(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
      <h1 className="text-3xl font-bold text-center">Nuevo gasto</h1>

      <input type="hidden" name="eventId" value={eventId} />

      <Input label="Gasto" name="expenseDescription" type="text" isRequired size="md"/>
      <Input label="Monto" name="expenseAmount" type="number" isRequired size="md"/>

      <ExpenseSplits participants={participants} />

      {showError && <p className="text-red-600 font-semibold">{showError}</p>}

      <Button type="submit" className="bg-gris-fuerte hover:bg-gray-600">
        Agregar
      </Button>
    </form>
  );
}