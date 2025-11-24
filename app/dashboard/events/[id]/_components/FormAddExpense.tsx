"use client";

import { addExpense } from "@/actions/expenses/create";
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { ExpenseSplits } from "./ExpenseSplits";

export default function FormAddExpense({ eventId, participants }: { eventId: string, participants: any[] }) {
    return (
        <form action={addExpense} className="bg-gris-intermedio py-2 px-4 flex flex-col gap-6 w-full rounded-lg">
            <h1 className="text-3xl font-bold text-center">Nuevo gasto</h1>

            <input type="hidden" name="eventId" value={eventId} />

            <Input label="Gasto" name="expenseDescription" type="text" isRequired size="md"/>
            <Input label="Monto" name="expenseAmount" type="number" isRequired size="md"/>

            <ExpenseSplits participants={participants} />

            <Button type="submit" className="bg-gris-fuerte hover:bg-gray-600">
                Agregar
            </Button>
        </form>
    );
}