//se muestra al agregar un split sobre gasto

"use client";

import { useState } from "react";
import { ParticipantsDropdown } from "./ParticipantsDropdown";
import { Input, Button } from "@heroui/react";
import { LuPlus, LuTrash } from "react-icons/lu";

export function ExpenseSplits({ participants }: { participants: any[] }) {
  const [splits, setSplits] = useState([{ id: Date.now() }]);

  const addSplit = () => setSplits([...splits, { id: Date.now() }]);
  const removeSplit = (id: number) => setSplits(splits.filter(s => s.id !== id));

  return (
    <div className="flex flex-col gap-3 items-center">
      <h2 className="text-xl font-semibold">Divide tu gasto</h2>

      {splits.map((split) => (
        <div key={split.id} className="flex flex-row gap-4 items-center bg-white p-3 rounded-lg">
          <div className="w-1/3">
            <ParticipantsDropdown participants={participants} name="splitUsers" />
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

          {splits.length > 1 && (
            <Button
              color="danger"
              variant="flat"
              onPress={() => removeSplit(split.id)}
            >
              <LuTrash size="15" />
            </Button>
          )}
        </div>
      ))}

      <Button onPress={addSplit} isIconOnly color="primary" variant="flat">
        <LuPlus size="15" />
      </Button>
    </div>
  );
}