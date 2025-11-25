"use client";

import { useState } from "react";
import { ParticipantsDropdown } from "./ParticipantsDropdown";
import { Input, Button } from "@heroui/react";
import { LuPlus, LuTrash } from "react-icons/lu";

export function ExpenseSplitsEdit({
  participants,
  existingSplits,
}: {
  participants: any[];
  existingSplits: any[];
}) {
  const initial = existingSplits.map((s: any) => ({
    id: Date.now() + Math.random(),
    userId: s.user.userId,
    amount: s.expenseSplitAmount,
    percentage: s.expenseSplitPercentage,
  }));

  const [splits, setSplits] = useState(initial);

  const addSplit = () => {
    setSplits([
      ...splits,
      {
        id: Date.now(),
        userId: "",
        amount: "",
        percentage: "",
      },
    ]);
  };

  const removeSplit = (id: number) => {
    setSplits(splits.filter((s) => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-xl font-semibold">Divide tu gasto</h2>

      {splits.map((split, index) => (
        <div
          key={split.id}
          className="flex flex-row gap-4 items-center bg-white p-3 rounded-lg"
        >
          <div className="w-1/3">
            <ParticipantsDropdown
              participants={participants}
              name="splitUsers"
              defaultUserId={split.userId}
            />
          </div>

          <Input
            label="Monto"
            type="number"
            name="splitAmounts"
            size="sm"
            className="w-1/3"
          />

          <Input
            label="%"
            type="number"
            name="splitPercentages"
            size="sm"
            className="w-1/3"
          />

          <Button
            color="danger"
            variant="flat"
            isIconOnly
            onPress={() => removeSplit(split.id)}
          >
            <LuTrash size="15" />
          </Button>
        </div>
      ))}

      <Button onPress={addSplit} color="primary" variant="flat" isIconOnly>
        <LuPlus size="15" />
      </Button>
    </div>
  );
}