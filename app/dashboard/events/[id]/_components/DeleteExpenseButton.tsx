"use client";

import deleteExpense from "@/actions/expenses/delete"
import { Button } from "@heroui/react"
import { LuTrash } from "react-icons/lu"

export default function DeleteExpenseButton({expenseId} : {expenseId: string}) {
    const deleteExpenseById = deleteExpense.bind(null, expenseId)

    return(
        <form action={deleteExpenseById} className="flex">
            <Button isIconOnly variant="flat" className="w-[10px] h-[30px]" color="danger" type="submit">
                <LuTrash size="15" />
            </Button>
        </form>
    )
}