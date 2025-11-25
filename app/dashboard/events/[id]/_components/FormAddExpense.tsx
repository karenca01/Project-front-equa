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

    const expenseDescription = formData.get("expenseDescription") as string;
    const expenseAmount = Number(formData.get("expenseAmount"));

    const splitUsers = formData.getAll("splitUsers") as string[];
    const splitAmounts = formData.getAll("splitAmounts").map(v => Number(v));
    const splitPercentages = formData.getAll("splitPercentages").map(v => Number(v));

    // console.log("---- Form Data ----");
    // console.log("Descripción:", expenseDescription);
    // console.log("Monto total:", expenseAmount);
    // console.log("Participantes:", splitUsers);
    // console.log("Montos:", splitAmounts);
    // console.log("Porcentajes:", splitPercentages);

    const splitAmountsNums = splitAmounts.map(a => isNaN(a) ? null : a);
    const splitPercentagesNums = splitPercentages.map(p => isNaN(p) ? null : p);

    if (splitUsers.some(u => u === "")) {
      setShowError("Debes seleccionar un participante en todos los splits");
      return;
    }

    let splitsUseAmount = false;
    let splitsUsePercentage = false;

    for (let i = 0; i < splitUsers.length; i++) {
      const amount = splitAmountsNums[i];
      const percent = splitPercentagesNums[i];

      if ((amount !== null && percent !== null && amount > 0 && percent > 0) || (amount === null && percent === null)) {
        setShowError(`Por split debes usar solo monto o solo porcentaje`);
        // console.log("Error: split inválido", { user: splitUsers[i], amount, percent });
        return;
      }

      if (amount !== null && amount > 0) splitsUseAmount = true;
      if (percent !== null && percent > 0) splitsUsePercentage = true;
    }

    if (splitsUseAmount && splitsUsePercentage) {
      setShowError("No puedes mezclar montos y porcentajes en un mismo gasto");
    //   console.log("Error: mezcla de amount y percentage en el gasto");
      return;
    }

    // Validación de suma
    if (splitsUseAmount) {
      const totalSplits = splitAmountsNums.reduce<number>((acc, v) => acc + (v ?? 0), 0);
    //   console.log("Suma montos:", totalSplits);
      if (totalSplits !== expenseAmount) {
        setShowError(`La suma de los montos (${totalSplits}) no coincide con el total (${expenseAmount})`);
        return;
      }
    }

    if (splitsUsePercentage) {
      const totalPercent = splitPercentagesNums.reduce<number>((acc, p) => acc + (p ?? 0), 0);
    //   console.log("Suma porcentajes:", totalPercent);
      if (totalPercent !== 100) {
        setShowError(`La suma de los porcentajes (${totalPercent}%) debe ser 100%`);
        return;
      }
    }

    setShowError("");

    const splits = splitUsers.map((user, index) => ({
      userId: user,
      expenseSplitAmount: splitAmountsNums[index] || null,
      expenseSplitPercentage: splitPercentagesNums[index] || null,
    }));

    const body = {
      expenseDescription,
      expenseAmount,
      eventId,
      splits,
    };

    // console.log(body);

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